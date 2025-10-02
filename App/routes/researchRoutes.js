import express from "express";
import {
  submitResearch,
  reviewResearch,
  getAllResearch,
} from "../controllers/researchController.js";
import { protect } from "../Middlewares/authMiddleware.js"; // assume you have admin middleware

const router = express.Router();

router.post("/submit", protect, submitResearch); // user submits research
router.get("/", protect, getAllResearch); // admin sees all submissions
router.put("/review/:id", protect, reviewResearch); // admin reviews

export default router;
