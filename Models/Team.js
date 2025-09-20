const mongoose = require("mongoose");

/**************************************************************************** */

const TeamSchema = new mongoose.Schema({
  Name: { type: String },
  MembersNumber: { type: Number, default: 0 },
  Maximum_Members: { type: Number },
});

/********************************************************** */

const Team = mongoose.model("Team", TeamSchema);

/********************************************************** */

exports.Team = Team;
