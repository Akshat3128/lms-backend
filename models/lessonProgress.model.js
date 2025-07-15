// models/lessonProgress.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Lesson from "./lesson.model.js";

const LessonProgress = sequelize.define("LessonProgress", {
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
  lessonId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Lesson, key: "id" },
  },
  completedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  uniqueKeys: {
    user_lesson_unique: {
      fields: ['userId', 'lessonId']
    }
  }
});

User.belongsToMany(Lesson, { through: LessonProgress, foreignKey: "userId" });
Lesson.belongsToMany(User, { through: LessonProgress, foreignKey: "lessonId" });
LessonProgress.belongsTo(Lesson, { foreignKey: "lessonId" });
LessonProgress.belongsTo(User, { foreignKey: "userId" });

export default LessonProgress;
