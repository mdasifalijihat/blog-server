import express, { Router } from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

// userrole se set korsi middlewares atuh teke ante hobe
router.post("/", auth(UserRole.USER), postController.createPost);
router.get("/", postController.getAllPost);
router.get("/:postId", postController.getPostById);

export const postRouter: Router = router;
