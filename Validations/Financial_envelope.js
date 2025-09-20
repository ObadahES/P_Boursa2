const Joi = require("joi");

/********************************************************************* */

const Financial_Envelope_Validation = Joi.object({
  Offer_Price: Joi.number().required(),
  // Bid_id: [Joi.number().required(), Joi.string().required()],
});

exports.Financial_Envelope_Validation = Financial_Envelope_Validation;
