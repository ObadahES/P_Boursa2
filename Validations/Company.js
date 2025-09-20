const Joi = require("joi");

const CreateCompany_Validation = Joi.object({
  Company_Name: Joi.string().required(),
  Company_Capital: Joi.string(),
  details: Joi.string().required(),
  Phone: Joi.number().required(),
  Email: Joi.string().required(),
});

exports.CreateCompany_Validation = CreateCompany_Validation;
