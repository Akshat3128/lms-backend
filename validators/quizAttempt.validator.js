// validators/quizAttempt.validator.js
import Joi from "joi";

export const quizAttemptSchema = Joi.object({
  quizId: Joi.string().uuid().required(),
  answers: Joi.array().items(
    Joi.object({
      questionId: Joi.string().uuid().required(),
      selectedAnswer: Joi.string().required()
    })
  ).min(1).required()
});
