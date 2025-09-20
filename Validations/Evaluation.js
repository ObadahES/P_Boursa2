const Joi = require("joi");

/**************************************************************** */

const Evaluation_Validation = Joi.object({
  Description: Joi.string().required(),
  Rate: Joi.number().required().max(5).min(0),
});

/**************************************************************** */

exports.Evaluation_Validation = Evaluation_Validation;
