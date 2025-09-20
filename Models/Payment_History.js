const mongoose = require("mongoose");
const Joi = require("joi");

/************************************************************************** */

const PaymentHistorySchema = new mongoose.Schema({
  SenderId: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentAccount" },
  ReceiverId: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentAccount" },
  Amount: { type: Number },
  Date: { type: Date, default: Date.now },
});
const PaymentHistory = new mongoose.model(
  "PaymentHistory",
  PaymentHistorySchema
);

exports.PaymentHistory = PaymentHistory;
