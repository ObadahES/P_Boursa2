const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { User } = require("../Models/User");
const { Tender } = require("../Models/Tender");
const { Company } = require("../Models/Company");
// require("dotenv").config();
const {
  Register_Validation,
  Login_Validation,
} = require("../Validations/Auth");

exports.Register = async (req, res) => {
  try {
    await Register_Validation.validateAsync(req.body);

    if (await User.findOne({ Email: req.body.Email })) {
      return res.status(400).json({ error: "Email already exists" });
    }
    if (await User.findOne({ PhoneNumber: req.body.PhoneNumber })) {
      return res.status(400).json({ error: "Phone number already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);

    const user = new User({
      First_Name: req.body.First_Name,
      Last_Name: req.body.Last_Name,
      Email: req.body.Email,
      PhoneNumber: req.body.PhoneNumber,
      Password: hashedPassword,
    });

    await user.save();
    // console.log({ _id: user._id, Email: user.Email });
    const token = jwt.sign(
      { _id: user._id, Email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    let isHasCompany = false;
    const company = await Company.findOne({ Owner_id: user._id });
    if (company) {
      isHasCompany = true;
    }

    res.status(201).json({
      message: "Account created successfully",
      user: _.pick(user, [
        "_id",
        "First_Name",
        "Last_Name",
        "Email",
        "PhoneNumber",
      ]),
      token: token,
      isHasCompany: isHasCompany,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error.details?.[0]?.message || error.message });
  }
};

exports.Login = async (req, res) => {
  try {
    await Login_Validation.validateAsync(req.body);

    const user = await User.findOne({ Email: req.body.Email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const validPassword = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!validPassword)
      return res.status(400).json({ error: "Invalid email or password" });
    console.log({ _id: user._id, Email: user.Email });
    const token = jwt.sign(
      { _id: user._id, Email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );
    let isHasCompany = false;
    const company = await Company.findOne({ Owner_id: user._id });
    if (company) {
      isHasCompany = true;
    }
    res.json({
      user: _.pick(user, [
        "_id",
        "First_Name",
        "Last_Name",
        "Email",
        "PhoneNumber",
      ]),
      token,
      isHasCompany: isHasCompany,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.details?.[0]?.message || error.message });
  }
};

exports.Get_All_Users = async (req, res) => {
  try {
    const { tenderId } = req.params;

    const tender = await Tender.findById(tenderId);
    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }

    const users = await User.find({
      _id: { $nin: tender.users },
    }).select("-Password");

    res.json({ users, hours: tender.users.length }); // hours = عدد المستخدمين المضافين مسبقًا
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
