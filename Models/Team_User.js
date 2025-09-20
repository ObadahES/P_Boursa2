const mongoose = require("mongoose");

/**************************************************************************** */

const Team_UserSchema = new mongoose.Schema({
  Team_id: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

/********************************************************** */

const Team_User = mongoose.model("Team_User", Team_UserSchema);

/********************************************************** */

exports.Team_User = Team_User;
