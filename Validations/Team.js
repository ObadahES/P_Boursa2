const Joi = require("joi");

/***************************************************** */

const Team_Validation = Joi.object({
  Name: Joi.string().required(),
  Maximum_Members: Joi.number().required(),
});

/***************************************************** */

exports.Team_Validation = Team_Validation;
