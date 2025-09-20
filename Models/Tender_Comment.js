const mongoose = require("mongoose");

/********************************************************************************* */

const TenderCommentSchema = new mongoose.Schema({
  Tender_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tender" },
  Parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tender_Comment",
    default: null,
  },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Content: { type: String },
});

/********************************************************************************* */

const Tender_Comment = mongoose.model("Tender_Comment", TenderCommentSchema);

/********************************************************************************* */

exports.Tender_Comment = Tender_Comment;
