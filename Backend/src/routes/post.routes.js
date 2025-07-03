import { Router } from "express";
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getMyPosts
} from "../controllers/post.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createPost)
    .get(getAllPosts)

router.route("/me").get(getMyPosts)
router.route("/:id")
    .get(getPostById)
    .put(updatePost)
    .delete(deletePost);

export default router;