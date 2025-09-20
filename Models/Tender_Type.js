const mongoose = require("mongoose");

/********************************************************** */

const Tender_Type_Schema = new mongoose.Schema({
  Type_id: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
  Tender_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tender" },
});
const Tender_Type = mongoose.model("Tender_Type", Tender_Type_Schema);

/********************************************************** */

exports.Tender_Type = Tender_Type;
