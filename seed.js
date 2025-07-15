// seed.js

import sequelize from "./config/db.js";
import User from "./models/user.model.js";
import Course from "./models/course.model.js";
import Lesson from "./models/lesson.model.js";
import Quiz from "./models/quiz.model.js";
import Question from "./models/question.model.js";
import { hashPassword } from "./utils/auth.js";

// Sync DB without wiping data
await sequelize.sync({ force: false });

console.log("🛠️ Seeding database...");

// 1. Admin user
const admin = await User.create({
  fullName: "Admin User",
  email: "admin@gmail.com",
  password: await hashPassword("admin123"),
  role: "admin",
});

// 2. Course
const course = await Course.create({
  title: "JavaScript Essentials",
  description: "Learn JavaScript step-by-step for beginners",
  instructor: "Admin User",
  price: 0,
});

// 3. Lessons
await Lesson.bulkCreate([
  {
    title: "Intro to JavaScript",
    videoUrl: "https://youtu.be/qoSksQ4s_hg?si=4OgKgvoiqdmMpsQn",
    resourceLink: "https://js-resources.dev/intro",
    courseId: course.id,
  },
  {
    title: "Variables & Data Types",
    videoUrl: "https://youtube.com/js-vars",
    resourceLink: "https://js-resources.dev/vars",
    courseId: course.id,
  },
  {
    title: "Functions and Scope",
    videoUrl: "https://youtube.com/js-functions",
    resourceLink: "https://js-resources.dev/functions",
    courseId: course.id,
  },
]);

// 4. Quiz
const quiz = await Quiz.create({
  title: "JavaScript Basics Quiz",
  courseId: course.id,
});

// 5. Questions
await Question.bulkCreate([
  {
    quizId: quiz.id,
    questionText: "What does '===' do in JavaScript?",
    options: ["Assign", "Compare loosely", "Compare strictly", "Declare variable"],
    correctAnswer: "Compare strictly",
  },
  {
    quizId: quiz.id,
    questionText: "Which keyword declares a constant?",
    options: ["let", "const", "var", "define"],
    correctAnswer: "const",
  },
  {
    quizId: quiz.id,
    questionText: "Which of these is a primitive type?",
    options: ["object", "array", "number", "function"],
    correctAnswer: "number",
  },
]);

console.log(" Seed data inserted successfully.");
process.exit();
