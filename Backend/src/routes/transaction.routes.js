import { Router } from "express";
import {
  createTransaction,
  getAllTransactions,
  getUserTransactions,
  deleteTransaction,
  getUserBalance,
} from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Protect all routes
router.use(verifyJWT);

// Routes
router.post("/", createTransaction);
router.get("/me", getUserTransactions);
router.get("/admin", getAllTransactions);
router.get("/balance", getUserBalance); // optional: user balance
router.delete("/:id", deleteTransaction);

export default router;
