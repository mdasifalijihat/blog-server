import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";

// create post
const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized",
      });
    }
    const result = await postService.createPost(req.body, user.id as string);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: "post create faild",
      details: error,
    });
  }
};

// get all post
const getAllPost = async (req: Request, res: Response) => {
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

    // pagination
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const skip = (page - 1) * limit;

    // shoting
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder as string | undefined;

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
    res.status(500).json({
      error: "post get faild",
      details: error,
    });
  }
};

export const postController = {
  createPost,
  getAllPost,
};
