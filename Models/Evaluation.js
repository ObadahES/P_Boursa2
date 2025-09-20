const mongoose = require("mongoose");

/********************************************************************************* */

const EvaluationSchema = new mongoose.Schema({
  Description: { type: String },
  Rate: { type: Number },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Offer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" },
  Team_id: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});

/********************************************************************************* */

const Evaluation = mongoose.model("Evaluation", EvaluationSchema);

/********************************************************************************* */

exports.Evaluation = Evaluation;
