import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// post create
const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt">,
) => {
  const result = await prisma.post.create({
    data,
  });
  return result;
};

// post get all

const getAllPost = async () => {
  const post = await prisma.post.findMany();
  return post;
};

export const postService = {
  createPost,
  getAllPost,
};
