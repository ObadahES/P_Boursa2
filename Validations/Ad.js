const Joi = require("joi");

const Ad_Validation = Joi.object({
  type: Joi.string().required().valid("Public", "Restricted", "Undefined"),
  details: Joi.string().required(),
  title: Joi.string().required(),
  authority: Joi.string().required(),
  category: Joi.string().required(),
  publishDate: Joi.string().required(),
  price: Joi.number().required(),
});

exports.Ad_Validation = Ad_Validation;
