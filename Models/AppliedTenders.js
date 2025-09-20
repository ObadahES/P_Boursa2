const mongoose = require("mongoose");

/********************************************************** */

const AppliedTendersSchema = new mongoose.Schema({
  Tender_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenders" },
  Company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  Offer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" },
});
const AppliedTenders = mongoose.model("AppliedTenders", AppliedTendersSchema);

/********************************************************************************************** */
exports.AppliedTenders = AppliedTenders;
