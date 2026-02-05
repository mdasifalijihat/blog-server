import { Request, Response } from "express";
import { commentServices } from "./commentService";

// create comment
const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const result = await commentServices.createComment(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: " create faild",
      details: error,
    });
  }
};

// get comment by id
const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const result = await commentServices.getCommentById(commentId as string);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: " comment get filed",
      details: error,
    });
  }
};

// get comment by author
const getCommentByAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const result = await commentServices.getCommentByAuthor(authorId as string);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: " comment get filed",
      details: error,
    });
  }
};
// get deleted comment or
const getDeleteComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { commentId } = req.params;
    const result = await commentServices.getDeleteComment(
      commentId as string,
      user?.id as string,
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: " deleted comment get filed",
      details: error,
    });
  }
};
// get deleted comment or
const updateComment = async (req: Request, res: Response) => {
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
    res.status(400).json({
      error: " comment update faild get filed",
      details: error,
    });
  }
};

export const commentController = {
  createComment,
  getCommentById,
  getCommentByAuthor,
  getDeleteComment,
  updateComment,
};
