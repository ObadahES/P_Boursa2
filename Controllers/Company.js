/**************************************************************************** */ //Models

const { Company } = require("../Models/Company");
const { User } = require("../Models/User");
const { Employee } = require("../Models/Employee");

/**************************************************************************** */ //Validations

const {
  CreateCompany_Validation,
  JoinValidation,
} = require("../Validations/Company");
const { ChangeRoleStatusValidation } = require("../Validations/Employee");

/**************************************************************************** */ //Functions

exports.Create_Company_Account_Request = async (req, res) => {
  try {
    await CreateCompany_Validation.validateAsync(req?.body);
  } catch (error) {
    return res.send(error);
  }
  const user = await User.findById(req?.user._id);
  if (!user) {
    return res.send(" Owner Is Not Found ");
  }

  const TestName = await Company.findOne({
    Company_Name: req?.body.Company_Name,
  });
  if (TestName) {
    return res.json({ message: " Company Is Already Exists " });
  }

  const company = new Company({
    Company_Name: req?.body.Company_Name,
    Company_Capital: req?.body.Company_Capital,
    Previous_work: req?.body.Previous_work,
    Owner_id: req?.user._id,
  });

  const employee = new Employee({
    Company_id: company._id,
    User_id: req?.user._id,
    IsBoss: true,
  });

  await employee.save();
  await company.save();
  return res.send(" Request Has Been Sent Successfully ... ");
};

/********************************************************************************** */
exports.Get_All_Requests_Companies = async (req, res) => {
  const user = await User.findById(req?.user._id);
  if (!user) {
    return res.send(" Owner Is Not Found ");
  }

  const requests = new Company.find({ IsAgree: false });

  if (!requests) {
    res.send("No Requests");
  }

  return res.send(requests);
};

/********************************************************************************** */
exports.Get_All_Companies = async (req, res) => {
  const Companies = new Company.find({ IsAgree: true });

  if (!Companies) {
    res.send("No Companies");
  }

  return res.send(Companies);
};
/********************************************************************************** */
