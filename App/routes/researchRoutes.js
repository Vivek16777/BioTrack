import express from "express";
import {
  submitResearch,
  reviewResearch,
} from "../controllers/researchController.js";
import { protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();
router.post("/submit", protect, submitResearch);
router.put("/review/:id", protect, reviewResearch);

export default router;
