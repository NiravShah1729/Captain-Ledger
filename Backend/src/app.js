import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes imports
import userRoutes from "./routes/user.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"
import postRoutes from "./routes/post.routes.js"
import missionRoutes from "./routes/mission.routes.js"
import feedbackRoutes from "./routes/feedback.routes.js"
import attendenceRoutes from "./routes/attendence.routes.js"

app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/posts",postRoutes)
app.use("/api/v1/missions", missionRoutes);
app.use("/api/v1/feedbacks",feedbackRoutes)
app.use("/api/v1/attendence",attendenceRoutes);

export default app;
