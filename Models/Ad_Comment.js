const mongoose = require("mongoose");

/********************************************************************************* */

const AdCommentSchema = new mongoose.Schema({
  Ad_id: { type: mongoose.Schema.Types.ObjectId, ref: "Ad" },
  Parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ad_Comment",
    default: null,
  },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Content: { type: String },
  Date: { type: Date, default: Date.now },
});

/********************************************************************************* */

const Ad_Comment = mongoose.model("Ad_Comment", AdCommentSchema);

/********************************************************************************* */

exports.Ad_Comment = Ad_Comment;
