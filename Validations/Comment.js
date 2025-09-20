const Joi = require("joi");

/******************************************************** */

const CommentValidation = Joi.object({
  Content: Joi.string().required(),
});

exports.CommentValidation = CommentValidation;
