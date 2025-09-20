const Joi = require("joi");

/******************************************************** */

const TypeValidation = Joi.object({
  Name: Joi.string().required(),
});

exports.TypeValidation = TypeValidation;
