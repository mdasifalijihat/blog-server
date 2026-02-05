import { Request, Response } from "express";
import { postService } from "./post.service";

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
    const result = await postService.getAllPost();
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
