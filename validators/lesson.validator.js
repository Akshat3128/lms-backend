// validators/lesson.validator.js
import Joi from "joi";

export const lessonSchema = Joi.object({
  title: Joi.string().min(3).required(),
  videoUrl: Joi.string().uri().required().messages({
    "string.uri": "Video URL must be a valid link",
  }),
  resourceLink: Joi.string().uri().optional(),
});
