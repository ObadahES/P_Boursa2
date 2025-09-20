const mongoose = require("mongoose");

/************************************************************************************** */

const FavoriteSchema = new mongoose.Schema({
  Tender_id: { type: mongoose.Schema.Types.ObjectId },
  User_id: { type: mongoose.Schema.Types.ObjectId },
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);

/************************************************************************************** */

exports.Favorite = Favorite;
