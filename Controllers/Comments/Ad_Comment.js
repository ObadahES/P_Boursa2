/********************************************************************************************/ //Models
const { Ad } = require("../../Models/Ad");
const { Ad_Comment } = require("../../Models/Ad_Comment");

/******************************************************************************************** */ //Validations

const { CommentValidation } = require("../../Validations/Comment");

/******************************************************************************************** */ //Functions

exports.Add_Ad_Comment = async (req, res, next) => {
  try {
    await CommentValidation.validateAsync(req.body);
  } catch (error) {
    return res.send(error);
  }
  const test = await Ad.findById(req.params.Ad_id);
  if (!test) {
    return res.send(" Ad Is Not Found ");
  }
  const comment = new Ad_Comment({
    Ad_id: req?.params.Ad_id,
    User_id: req?.user._id,
    Content: req?.body.Content,
  });
  await comment.save();
  return res.send(" Done ");
};

/***************************************************************************** */

exports.Add_Ad_Comment_Reply = async (req, res, next) => {
  try {
    await CommentValidation.validateAsync(req.body);
  } catch (error) {
    return res.send(error);
  }
  const test = await Ad_Comment.findById(req.params.Parent_id);
  if (!test) {
    return res.send(" Comment Is Not Found ");
  }
  const comment = new Ad_Comment({
    Parent_id: req?.params.Parent_id,
    User_id: req?.user._id,
    Content: req?.body.Content,
  });
  await comment.save();
  return res.send(" Done ");
};

/***************************************************************************** */

/***************************************************************************** */

exports.Get_All_Ad_Comments = async (req, res, next) => {
  const test = await Ad.findById(req.params.Ad_id);
  if (!test) {
    return res.send(" Ad Is Not Found ");
  }
  const comments = await Ad_Comment.find({
    Ad_id: req?.params.Ad_id,
  })
    .sort({ Date: -1 })
    .populate("User_id");
  if (comments.length === 0) {
    return res.send(" No Comments ");
  }
  console.log(comments);
  return res.send(comments);
};

/***************************************************************************** */

exports.Get_Ad_Comment_Replies = async (req, res, next) => {
  const test = await Ad_Comment.findById(req.params.Parent_id);
  if (!test) {
    return res.send(" Comment Is Not Found ");
  }
  const comments = await Ad_Comment.find({
    Parent_id: req?.params.Parent_id,
  }).populate("User_id");
  if (!comments) {
    return res.send(" No Comments ");
  }
  return res.send(comments);
};
