// models/quiz.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Course from "./course.model.js";

const Quiz = sequelize.define("Quiz", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Course,
      key: "id",
    },
  }
}, {
  timestamps: true,
});

Course.hasMany(Quiz, { foreignKey: "courseId" });
Quiz.belongsTo(Course, { foreignKey: "courseId" });

export default Quiz;
