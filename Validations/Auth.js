const Joi = require("joi");

const Register_Validation = Joi.object({
  First_Name: Joi.string()
    .required()
    .messages({ "any.required": "First Name is required" }),
  Last_Name: Joi.string()
    .required()
    .messages({ "any.required": "Last Name is required" }),
  Email: Joi.string()
    .email()
    .required()
    .messages({ "string.email": "Invalid email format" }),
  PhoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits",
    }),
  Password: Joi.string()
    .min(8)
    .max(32)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
  ConfirmPassword: Joi.string()
    .valid(Joi.ref("Password"))
    .required()
    .messages({ "any.only": "Passwords must match" }),
  // role: Joi.string().required(),
});

const Login_Validation = Joi.object({
  Email: Joi.alternatives()
    .try(Joi.string().email(), Joi.string().pattern(/^\d{10}$/))
    .required()
    .messages({
      "alternatives.match":
        "Email must be a valid email or a 10-digit phone number",
    }),
  Password: Joi.string().required(),
});

exports.Register_Validation = Register_Validation;
exports.Login_Validation = Login_Validation;
