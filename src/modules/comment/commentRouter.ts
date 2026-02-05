import express, { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { commentController } from "./commentController";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.createComment,
);
router.get(
  "/:commentId",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.getCommentById,
);

router.get(
  "/:author/:authorId",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.getCommentByAuthor,
);

router.delete(
  "/:commentId",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.getDeleteComment,
);

router.patch(
  "/:commentId",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.updateComment,
);

export const commentRouter: Router = router;
