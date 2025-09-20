const Joi = require("joi");

/*************************************************************************************** */

const ChangeRoleStatusValidation = Joi.object({
  Role: Joi.string()
    .valid("Admin", "Financial officer", "Agent", "Deputy", "Employee")
    .required(),
});
const JoinValidation = Joi.object({
  // First_Name: Joi.string().required(),
  // Last_Name: Joi.string().required(),
  Occupation: Joi.string().required(),
  Biography: Joi.string(),
  Company_Name: Joi.string().required(),
});

/*************************************************************************************** */

exports.JoinValidation = JoinValidation;
exports.ChangeRoleStatusValidation = ChangeRoleStatusValidation;
// enum(["Financial officer", "Agent", "Deputy", "Employee"])
