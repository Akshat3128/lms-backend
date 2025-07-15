// controllers/quizAttempt.controller.js
import QuizAttempt from "../models/quizAttempt.model.js";
import Question from "../models/question.model.js";
import { quizAttemptSchema } from "../validators/quizAttempt.validator.js";

export const submitQuiz = async (req, res) => {
    if (req.user.role === "admin") {
    return res.status(403).json({ error: "Admins cannot submit quizzes" });
    }
    
    const { error } = quizAttemptSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { quizId, answers } = req.body;
    const userId = req.user.id;

    try {
        const questions = await Question.findAll({ where: { quizId } });

        if (questions.length === 0)
        return res.status(404).json({ error: "No questions found for quiz" });

        let score = 0;
        const total = questions.length;

        for (const q of questions) {
        const userAnswer = answers.find(a => a.questionId === q.id);
        if (userAnswer && userAnswer.selectedAnswer === q.correctAnswer) {
            score += 1;
        }
        }

    const attempt = await QuizAttempt.create({ userId, quizId, score, total });

    res.status(201).json({ message: "Quiz submitted", score, total });
    } catch (err) {
        res.status(500).json({ error: "Quiz submission failed", detail: err.message });
    }
};

export const getMyAttempts = async (req, res) => {
    if (req.user.role === "admin") {
        return res.status(403).json({ error: "Admins cannot see submitted quizzes" });
    }

    try {
        const attempts = await QuizAttempt.findAll({ where: { userId: req.user.id } });
        res.json(attempts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch attempts" });
    }
};
