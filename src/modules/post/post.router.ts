import express, { Router } from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

// userrole se set korsi middlewares atuh teke ante hobe
router.get("/", postController.getAllPost);

router.get(
  "/my-posts",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.getMyPost,
);
router.get("/:postId", postController.getPostById);

router.patch("/:postId", auth(UserRole.USER), postController.updatePost);

router.post("/", auth(UserRole.USER), postController.createPost);
router.delete("/:postId", auth(UserRole.USER), postController.deletePost);

export const postRouter: Router = router;
