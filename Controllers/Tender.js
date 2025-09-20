/********************************************************************************************/
// Models
const { User } = require("../Models/User");
const { Tender } = require("../Models/Tender");
const { Type } = require("../Models/Type");
const { Tender_Type } = require("../Models/Tender_Type");
const { Company } = require("../Models/Company");
const { AppliedTenders } = require("../Models/AppliedTenders");
const { Ad } = require("../Models/Ad");
const SavedTenders = require("../Models/SavedTenders");
const NotifyingAds = require("../Models/NotifyingAds");
const { Offer } = require("../Models/Offer");

/********************************************************************************************/

const { TenderValidation } = require("../Validations/Tender");
const { TypeValidation } = require("../Validations/Type");

/********************************************************************************************/
exports.Add_Tender = async (req, res) => {
  try {
    await TenderValidation.validateAsync(req.body);

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const tender = new Tender({
      title: req.body.title,
      Owner_id: req.user._id,
      university: req.body.university,
      category: req.body.category,
      endDate: req.body.endDate,
      price: req.body.price,
      descripion: req.body.descripion,
      type: req.body.type,
      progress: req.body.progress,
    });

    await tender.save();

    return res.status(201).json({
      message: "Tender created successfully",
      tender,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: error.details?.[0]?.message || error.message,
    });
  }
};

/********************************************************************************************/

exports.Get_All_Tenders = async (req, res) => {
  try {
    // نحاول إيجاد الشركة، لكن لا نوقف العملية إذا لم توجد
    const company = await Company.findOne({ Owner_id: req.user._id });
    let appliedTenderIds = [];

    if (company) {
      const offers = await Offer.find({ Company_id: company._id });
      appliedTenderIds = offers.map((offer) => offer.Tender_id.toString());
    }

    const tenders = await Tender.find().populate(
      "Owner_id",
      "First_Name Last_Name _id"
    );

    if (!tenders || tenders.length === 0) {
      return res.status(404).json({ error: "No tenders found" });
    }

    const tendersWithApplied = tenders.map((tender) => {
      const isApplied = appliedTenderIds.includes(tender.id.toString());
      return {
        ...tender.toObject(),
        isApplied, // إذا لم توجد شركة، ستكون appliedTenderIds فارغة => false تلقائياً
      };
    });

    return res.status(200).json(tendersWithApplied);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/********************************************************************************************/

exports.SaveNewTender = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.Tender_id);
    if (!tender) {
      return res.status(404).json({ error: "Tender is Not Found" });
    }
    const existingSavedTender = await SavedTenders.findOne({
      Tender_ID: tender._id,
      User_ID: req.user._id,
    });
    if (existingSavedTender) {
      return res.status(400).json({ error: "Tender Already Saved" });
    }
    const savedTenders = new SavedTenders({
      Tender_ID: tender._id,
      User_ID: req.user._id,
    });
    await savedTenders.save();

    return res.status(200).json(savedTenders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/********************************************************************************************/

exports.CancelSavedTender = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.Tender_id);
    if (!tender) {
      return res.status(404).json({ error: "Tender is Not Found" });
    }
    await SavedTenders.findOneAndDelete({
      Tender_ID: tender._id,
      User_ID: req.user._id,
    });

    return res.status(200).json({ message: "Canceled Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/********************************************************************************************/

exports.SavedTenders = async (req, res) => {
  try {
    const savedTenders = await SavedTenders.find({
      User_ID: req.user._id,
    }).populate("Tender_ID");

    return res.status(200).json(savedTenders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/********************************************************************************************/

exports.AppliedTenders = async (req, res) => {
  try {
    const user = req.user;
    const company = await Company.findOne({ Owner_id: user._id });

    let offers = [];
    if (company) {
      offers = await Offer.find({ Company_id: company._id }).populate(
        "Tender_id"
      );
    }

    const tenders = offers.map((offer) => offer.Tender_id);

    return res.status(200).json(tenders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/********************************************************************************************/

exports.Get_All_User_Tenders = async (req, res) => {
  try {
    const tenders = await Tender.find({ Owner_id: req.user._id }).populate(
      "Owner_id",
      "First_Name Last_Name -_id"
    );

    if (!tenders || tenders.length === 0) {
      return res.status(404).json({ error: "No tenders for this user" });
    }

    return res.status(200).json(tenders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/********************************************************************************************/
exports.Add_Tender_Type = async (req, res) => {
  try {
    await TypeValidation.validateAsync(req.body);

    const tender = await Tender.findById(req.params.Tender_id);
    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }

    let type = await Type.findOne({ Name: req.body.Name });
    if (!type) {
      type = new Type({ Name: req.body.Name });
      await type.save();
    }

    const tender_type = new Tender_Type({
      Type_id: type._id,
      Tender_id: tender._id,
    });
    await tender_type.save();

    return res.status(201).json({ message: "Tender type added successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.details?.[0]?.message || error.message });
  }
};

/********************************************************************************************/
exports.Add_Tender_Users = async (req, res) => {
  try {
    const { user_ids } = req.body;
    const { Tender_id } = req.params;

    if (!Array.isArray(user_ids) || user_ids.length === 0) {
      return res.status(400).json({ error: "Users Not Found" });
    }

    const tender = await Tender.findById(Tender_id);
    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }

    // تحقق من صلاحية المستخدمين
    const users = await User.find({ _id: { $in: user_ids } });
    if (users.length !== user_ids.length) {
      return res.status(400).json({ error: "Some user IDs are invalid" });
    }

    // منع التكرار: استبعد المستخدمين الموجودين مسبقًا
    const newUsers = user_ids.filter(
      (id) => !tender.users.map((u) => u.toString()).includes(id.toString())
    );

    if (newUsers.length === 0) {
      return res
        .status(400)
        .json({ error: "All selected users already exist in this tender" });
    }

    tender.users.push(...newUsers);
    await tender.save();

    return res.status(200).json({
      message: "Users added to tender successfully",
      addedUsers: newUsers,
      tender,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.DeleteTender = async (req, res) => {
  try {
    const { Tender_id } = req.params;
    const tender = await Tender.findById(Tender_id);
    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }
    if (tender.Owner_id.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this tender" });
    }
    await Tender.findByIdAndDelete(Tender_id);
    return res.status(200).json({ message: "Tender deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/********************************************************************************************/

/********************************************************************************************/
