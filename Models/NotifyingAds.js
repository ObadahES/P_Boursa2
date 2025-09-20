const mongoose = require("mongoose");

/********************************************************************** */
const NotifyingAdsSchema = new mongoose.Schema({
  Ad_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ad",
    required: true,
  },
  User_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Date: { type: Date, default: Date.now },
});

const NotifyingAds = mongoose.model("Notifying Ads", NotifyingAdsSchema);
module.exports = NotifyingAds;
