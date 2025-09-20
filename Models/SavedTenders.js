const mongoose = require("mongoose");

/********************************************************************** */
const SavedTendersSchema = new mongoose.Schema({
  Tender_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tender",
    required: true,
  },
  User_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Date: { type: Date, default: Date.now },
});

const SavedTenders = mongoose.model("SavedTenders", SavedTendersSchema);
module.exports = SavedTenders;
