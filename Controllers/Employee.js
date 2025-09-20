/********************************************************************************************/ //Models
const { Company } = require("../Models/Company");
const { User } = require("../Models/User");
const { Employee } = require("../Models/Employee");
/********************************************************************************************/ //Validations
const { CreateCompany_Validation } = require("../Validations/Company");
const { JoinValidation } = require("../Validations/Employee");
const { ChangeRoleStatusValidation } = require("../Validations/Employee");

/********************************************************************************************/ //Functions
exports.ChangeRoleStatus = async (req, res) => {
  try {
    await ChangeRoleStatusValidation.validateAsync(req?.body);
  } catch (error) {
    return res.send(error);
  }
  const emp = await Employee.findById(req?.params.EmployeeId);

  if (!emp) {
    return res.send(" Employee Is Not Found ");
  }
  if (emp.IsAgree == false) {
    return res.send(" Employee Is Not Accepted ");
  }

  const employee = await Employee.findByIdAndUpdate(
    req?.params.EmployeeId,
    {
      $set: { Role: req?.body.Role },
    },
    { new: true }
  );
  // await employee.save();

  // user.save();

  return res.send(employee + " Updated Successfully ");
};

/******************************************************************************************* */

exports.Accept_Employee = async (req, res) => {
  const employee = await Employee.findById(req?.params.Employee_id);

  if (!employee) {
    return res.send(" Employee Is Not Found ");
  }

  await Employee.findByIdAndUpdate(req?.params.Employee_id, {
    $set: { IsAgree: true },
  });
  return res.send("Accepted Successfully ... !");
};

/******************************************************************************************* */

exports.ChangeAdminStatus = async (req, res) => {
  const employee = await Employee.findById(req?.params.Employee_id);

  if (!employee) {
    return res.send(" Employee Is Not Found ");
  }
  // if (employee.IsAdmin) {
  await Employee.findByIdAndUpdate(req?.params.Employee_id, {
    $set: { IsAdmin: !employee.IsAdmin },
  });
  // } else {
  //   await Employee.findByIdAndUpdate(req?.params.Employee_id, {
  //     $set: { IsAdmin: true },
  //   });
  // }

  return res.send("Accepted Successfully ... !");
};

/*********************************************************************************** */
exports.JoinCompanyRequest = async (req, res) => {
  try {
    await JoinValidation.validateAsync(req?.body);
  } catch (error) {
    return res.send(error);
  }

  const TestEmployee = await Employee.findOne({ User_id: req?.user._id });
  if (TestEmployee) {
    return res.send(" You are already joined to a company ");
  }
  const company = await Company.findOne({
    Company_Name: req?.body.Company_Name,
  });

  const employee = new Employee({
    Occupation: req?.body.Occupation,
    Company_id: company._id,
    User_id: req?.user._id,
  });

  // user.Join_Company = true;
  // user.Company_id = company.Company_id;
  try {
    employee.save();
  } catch (error) {
    return res.send(error);
  }

  // user.save();

  return res.send(" Request Has Been Sent Successfully ...  ");
};
