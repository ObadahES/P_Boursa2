/********************************************************************************************/ //Models

const { Tender } = require("../../Models/Tender");
const { Type } = require("../../Models/Type");
const { Tender_Comment } = require("../../Models/Tender_Comment");

/******************************************************************************************** */ //Validations

const { CommentValidation } = require("../../Validations/Comment");
const { TypeValidation } = require("../../Validations/Type");

/******************************************************************************************** */ //Functions

exports.Add_Tender_Comment = async (req, res, next) => {
  try {
    await CommentValidation.validateAsync(req.body);
  } catch (error) {
    return res.send(error);
  }
  const test = await Tender.findById(req.params.Tender_id);
  if (!test) {
    return res.send(" Tender Is Not Found ");
  }
  const comment = new Tender_Comment({
    Tender_id: req?.params.Tender_id,
    Content: req?.body.Content,
  });
  await comment.save();
  return res.send(" Done ");
};

/******************************************************************************************** */

exports.Add_Tender_Comment_Reply = async (req, res, next) => {
  try {
    await CommentValidation.validateAsync(req.body);
  } catch (error) {
    return res.send(error);
  }
  const test = await Tender_Comment.findById(req.params.Parent_id);
  if (!test) {
    return res.send(" Comment Is Not Found ");
  }
  const comment = new Tender_Comment({
    Parent_id: req?.params.Parent_id,
    Content: req?.body.Content,
  });
  await comment.save();
  return res.send(" Done ");
};

/***************************************************************************** */

exports.Get_All_Tender_Comments = async (req, res, next) => {
  const test = await Tender.findById(req.params.Tender_id);
  if (!test) {
    return res.send(" Tender Is Not Found ");
  }
  const comments = await Tender_Comment.find({
    Tender_id: req?.params.Tender_id,
  });
  if (!comments) {
    return res.send(" No Comments ");
  }
  return res.send(comments);
};

/***************************************************************************** */

exports.Get_Tender_Comment_Replies = async (req, res, next) => {
  const test = await Tender_Comment.findById(req.params.Parent_id);
  if (!test) {
    return res.send(" Comment Is Not Found ");
  }
  const comments = await Tender_Comment.find({
    Parent_id: req?.params.Parent_id,
  });
  if (!comments) {
    return res.send(" No Comments ");
  }
  return res.send(comments);
};

/***************************************************************************** */

