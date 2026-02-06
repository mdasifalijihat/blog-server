import { NextFunction, Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helper/paginationSortingHelper";
import { UserRole } from "../../middlewares/auth";
import AppError from "../../middlewares/appErrors";

// create post
const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      throw new AppError("Unauthorized", 401);
    }
    const result = await postService.createPost(req.body, user.id as string);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// get all post
const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // search option
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;

    // tags option
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    // isFeatured
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;

    // const status
    const status = req.query.status as PostStatus | undefined;

    // author id
    const authorId = req.query.authorId as string | undefined;

    // pagination ata use post paginationsortingHelper
    // const page = Number(req.query.page ?? 1);
    // const limit = Number(req.query.limit ?? 10);
    // const skip = (page - 1) * limit;

    // // shoting
    // const sortBy = req.query.sortBy as string | undefined;
    // const sortOrder = req.query.sortOrder as string | undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query,
    );

    const result = await postService.getAllPost({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// get post by id
const getPostById = async (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      throw new AppError("Unauthorized", 401);
    }
    const result = await postService.getPostById(postId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// get my post
const getMyPost = async (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new AppError("Unauthorized", 401);
    }
    const result = await postService.getMyPost(user.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// update user post
const updatePost = async (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    const { postId } = req.params;
    const isAdmin = user.role === UserRole.ADMIN;
    const result = await postService.updatePost(
      postId as string,
      req.body,
      user.id,
      isAdmin,
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
// update user post
const deletePost = async (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    const { postId } = req.params;
    const isAdmin = user.role === UserRole.ADMIN;
    const result = await postService.deletePost(
      postId as string,
      user.id,
      isAdmin,
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
// update user post
const getStats = async (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await postService.getStats();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const postController = {
  createPost,
  getAllPost,
  getPostById,
  getMyPost,
  updatePost,
  deletePost,
  getStats,
};
