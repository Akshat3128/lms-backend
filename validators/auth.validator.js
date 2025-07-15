// validators/auth.validator.js
import Joi from "joi";

export const signupSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .required()
    .messages({
      "string.pattern.base": "Email must be a valid @gmail.com address",
    }),
  password: Joi.string().min(6).max(100).required(),
  role: Joi.string().valid("user").required()
    .messages({
      "any.only": "Only 'user' role is allowed during signup"
    })
});


export const loginSchema = Joi.object({
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
