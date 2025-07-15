// models/quizAttempt.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Quiz from "./quiz.model.js";

const QuizAttempt = sequelize.define("QuizAttempt", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  quizId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Quiz, key: "id" },
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true,
});

User.hasMany(QuizAttempt, { foreignKey: "userId" });
Quiz.hasMany(QuizAttempt, { foreignKey: "quizId" });

export default QuizAttempt;
