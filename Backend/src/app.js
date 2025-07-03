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
import transactionRouter from "./routes/transaction.routes.js"
import postRouter from "./routes/post.routes.js"

app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/posts",postRouter)
export default app;
