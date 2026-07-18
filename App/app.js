import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import researchRoutes from "./routes/researchRoutes.js";

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BioTrack Backend is running 🚀",
    timestamp: new Date(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/research", researchRoutes);

export default app;
