import { Router } from "express";
import {
    registerUser,
    loginUser,
    getMyProfile
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    }
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/me").get(verifyJWT, getMyProfile);

export default router;