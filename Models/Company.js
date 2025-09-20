const mongoose = require("mongoose");

/********************************************************** */

const CompanySchema = new mongoose.Schema({
  Company_Name: { type: String, unique: true },
  Company_Capital: { type: String },
  details: { type: String },
  Phone: { type: Number },
  Email: { type: String },
  Owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  IsAgree: { type: Boolean, default: true },
  IsRejected: { type: Boolean, default: false },
});
const Company = mongoose.model("Company", CompanySchema);

/********************************************************************************************** */
exports.Company = Company;
