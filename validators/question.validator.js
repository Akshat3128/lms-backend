// validators/question.validator.js
import Joi from "joi";

export const questionSchema = Joi.object({
  quizId: Joi.string().uuid().required(),
  questionText: Joi.string().min(5).required(),
  options: Joi.array().items(Joi.string()).min(2).required(),
  correctAnswer: Joi.string().required(),
});
