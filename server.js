require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const db = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const courseRoutes = require("./routes/course.routes");

app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;

await require("./models/user.model").sync(); // Sync the User model
await require("./models/course.model").sync();
app.listen(PORT, async () => {
  try {
    await db.authenticate();
    console.log("Connected to PostgreSQL");
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("DB connection failed", err);
  }
});