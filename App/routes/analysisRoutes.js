import express from "express";
import { analyze, getHistory } from "../controllers/analysisController.js";
import { protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/analyze", protect, analyze);
router.get("/history", protect, getHistory);

export default router;
