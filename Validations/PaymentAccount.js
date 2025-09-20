const Joi = require("joi");

/********************************************************************* */

const PaymentAccount_Validation = Joi.object({
  Balance: Joi.number().required(),
});

const TransferMoney_Validation = Joi.object({
  Amount: Joi.number().required(),
});

const AddBalance_Validation = Joi.object({
  Amount: Joi.number().required(),
});

exports.PaymentAccount_Validation = PaymentAccount_Validation;
exports.TransferMoney_Validation = TransferMoney_Validation;
exports.AddBalance_Validation = AddBalance_Validation;
