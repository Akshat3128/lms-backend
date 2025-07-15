import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import lessonRoutes from "./routes/lesson.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import questionRoutes from "./routes/question.routes.js";
import quizAttemptRoutes from "./routes/quizAttempt.routes.js";
import lessonProgressRoutes from "./routes/lessonProgress.routes.js";

// Sync models
import "./models/user.model.js";
import "./models/course.model.js";
import "./models/enrollment.model.js";
import "./models/lesson.model.js";
import "./models/quiz.model.js";
import "./models/question.model.js";
import "./models/quizAttempt.model.js";
import "./models/lessonProgress.model.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 100 }));

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/courses", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/quiz-attempts", quizAttemptRoutes);
app.use("/api/lesson-progress", lessonProgressRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

try {
  await sequelize.authenticate();
  console.log("✅ Connected to PostgreSQL");
  
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("❌ DB Connection Failed:", err);
}
