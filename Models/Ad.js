const mongoose = require("mongoose");

/************************************************************************ */

const AdSchema = new mongoose.Schema({
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  type: { type: String },
  details: { type: String },
  authority: { type: String },
  category: { type: String },
  announcementDate: { type: Date, default: Date.now() },
  publishDate: { type: String },
  price: { type: Number },
  status: { type: String, default: "Soon" },
});

const Ad = mongoose.model("Ad", AdSchema);

exports.Ad = Ad;
