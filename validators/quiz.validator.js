// validators/quiz.validator.js
import Joi from "joi";

export const quizSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  courseId: Joi.string().uuid().required(),
});
