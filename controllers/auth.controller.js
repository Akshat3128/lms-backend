// controllers/auth.controller.js
const Joi = require("joi");
const User = require("../models/user.model");
const { hashPassword, comparePassword, generateToken } = require("../utils/auth");

const signup = async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const existing = await User.findOne({ where: { email: req.body.email } });
    if (existing) return res.status(409).json({ error: "Email already in use" });

    const user = await User.create({
      ...req.body,
      password: await hashPassword(req.body.password),
    });

    const token = generateToken({ id: user.id, role: user.role });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

const login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await comparePassword(req.body.password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { signup, login };
