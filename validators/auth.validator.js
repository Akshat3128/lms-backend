// validators/auth.validator.js
const Joi = require("joi");

exports.signupSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters",
  }),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .required()
    .messages({
      "string.pattern.base": "Email must be a valid @gmail.com address",
    }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.min": "Password must be at least 6 characters long",
  }),
});

exports.loginSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .required()
    .messages({
      "string.pattern.base": "Only @gmail.com emails are allowed",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
