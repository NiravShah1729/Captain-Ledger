import express from "express";
import {
  createFeedback,
  getFeedbackForMission
} from "../controllers/feedback.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.js"

const router = express.Router();

router.post("/", verifyJWT, createFeedback); // Submit form
router.get("/mission/:missionId", verifyJWT,isAdmin, getFeedbackForMission); // Admin review

export default router;
