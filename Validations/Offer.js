const Joi = require("joi");

const OfferValidation = Joi.object({
  Financial_envelope: Joi.object().required(),
  Artistic_envelope: Joi.object().required(),
  Mobile: Joi.number().integer().required(),
});

/********************************************************************** */

exports.OfferValidation = OfferValidation;
