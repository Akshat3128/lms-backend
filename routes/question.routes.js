// routes/question.routes.js
import express from "express";
import { createQuestion } from "../controllers/question.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createQuestion); // admin only

export default router;
