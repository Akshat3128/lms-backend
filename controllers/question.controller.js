// controllers/question.controller.js
import Quiz from "../models/quiz.model.js";
import Question from "../models/question.model.js";
import { questionSchema } from "../validators/question.validator.js";

export const createQuestion = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Only admins can add questions" });
  }

  const { error } = questionSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const quiz = await Quiz.findByPk(req.body.quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: "Question creation failed", detail: err.message });
  }
};
