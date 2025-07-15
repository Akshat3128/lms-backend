// models/question.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Quiz from "./quiz.model.js";

const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quizId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Quiz,
      key: "id",
    },
  },
  questionText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.STRING), // e.g., ["A", "B", "C", "D"]
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.STRING, // e.g., "A"
    allowNull: false,
  }
}, {
  timestamps: true,
});

Quiz.hasMany(Question, { foreignKey: "quizId" });
Question.belongsTo(Quiz, { foreignKey: "quizId" });

export default Question;
