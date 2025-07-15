const Joi = require("joi");

exports.courseSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  instructor: Joi.string().required(),
  price: Joi.number().min(0).required(),
});
