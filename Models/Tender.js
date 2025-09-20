const { required } = require("joi");
const { Int32 } = require("mongodb");
const { Double } = require("mongodb");
const mongoose = require("mongoose");

const TenderSchema = new mongoose.Schema({
  title: { type: String },
  university: { type: String },
  category: { type: String },
  price: { type: String },
  remainingDays: { type: Number },
  progress: { type: Number },
  startDate: { type: Date, default: Date.now() },
  endDate: { type: String },
  timestamp: { type: Date, default: Date.now() },
  Owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  descripion: { type: String, minlength: 5, maxlengh: 1000 },
  Team_id: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  type: { type: String },
  status: { type: String, default: "Active" },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Tender = mongoose.model("Tender", TenderSchema);

exports.Tender = Tender;
