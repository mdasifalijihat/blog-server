import { NextFunction, Request, Response } from "express";
import { commentServices } from "./commentService";

// create comment
const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const result = await commentServices.createComment(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// get comment by id
const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { commentId } = req.params;
    const result = await commentServices.getCommentById(commentId as string);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// get comment by author
const getCommentByAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorId } = req.params;
    const result = await commentServices.getCommentByAuthor(authorId as string);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
// get deleted comment or
const getDeleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const { commentId } = req.params;
    const result = await commentServices.getDeleteComment(
      commentId as string,
      user?.id as string,
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
// get deleted comment or
const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const { commentId } = req.params;
    const result = await commentServices.updateComment(
      commentId as string,
      req.body,
      user?.id as string,
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
// get deleted comment or
const moderateComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { commentId } = req.params;
    const result = await commentServices.moderateComment(
      commentId as string,
      req.body,
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const commentController = {
  createComment,
  getCommentById,
  getCommentByAuthor,
  getDeleteComment,
  updateComment,
  moderateComment,
};
