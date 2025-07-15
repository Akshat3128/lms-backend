// models/enrollment.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Course from "./course.model.js";

const Enrollment = sequelize.define("Enrollment", {
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
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Course, key: "id" },
  },
}, {
  timestamps: true,
  uniqueKeys: {
    unique_enrollment: {
      fields: ["userId", "courseId"],
    },
  },
});

User.belongsToMany(Course, { through: Enrollment, foreignKey: "userId" });
Course.belongsToMany(User, { through: Enrollment, foreignKey: "courseId" });

export default Enrollment;
