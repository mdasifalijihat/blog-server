import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// post create
const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string,
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
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
