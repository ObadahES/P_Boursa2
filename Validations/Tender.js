const Joi = require("joi");

const TenderValidation = Joi.object({
  title: Joi.string().required(),
  university: Joi.string().required(),
  category: Joi.string().required(),
  endDate: Joi.string().required(),
  price: Joi.string().required(),
  progress: Joi.number().required(),
  descripion: Joi.string().required().min(5).max(1000),
  type: Joi.string().required().valid("Public", "Restricted", "Undefined"),
});

exports.TenderValidation = TenderValidation;
