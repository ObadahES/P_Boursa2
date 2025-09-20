const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  First_Name: { type: String, minlength: 3, maxlength: 255 },
  Last_Name: { type: String, minlength: 3, maxlength: 255 },
  Email: { type: String, maxlength: 255, unique: true },
  PhoneNumber: { type: Number, unique: true },
  Password: { type: String },
  // ConfirmPassword: { type: String },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    // { IsAdmin: this.IsAdmin },
    "PrimaryKey"
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

exports.User = User;
// exports.UserSchema = UserSchema;
