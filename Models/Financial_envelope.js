const mongoose = require("mongoose");

/************************************************************************** */

const FinancialSchema = new mongoose.Schema({
  Offer_Price: { type: Number },
  // Bid_id: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" },
});
// const Financial_envelope = new mongoose.model(
//   "Financial_envelope",
//   FinancialSchema
// );

exports.FinancialSchema = FinancialSchema;
// exports.Financial_envelope = Financial_envelope;
