import express, { Router } from "express";
import {
  createAttendenceSession,
  markAttendence,
  getAllAttendenceStats,
  getAttendenceStatsById,
} from "../controllers/attendence.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin  from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/session",verifyJWT,isAdmin,createAttendenceSession);

router.post("/mark",verifyJWT,markAttendence);

router.get("/stats",verifyJWT,isAdmin, getAllAttendenceStats)

router.get("/stats/:userId",verifyJWT,getAttendenceStatsById);

export default router;
