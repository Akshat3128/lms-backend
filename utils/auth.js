// utils/auth.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const hashPassword = async (password) => await bcrypt.hash(password, 10);
export const comparePassword = async (plain, hashed) => await bcrypt.compare(plain, hashed);
export const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
