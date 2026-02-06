import {
  CommentStatus,
  Post,
  PostStatus,
} from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
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

// post get all search tags
const getAllPost = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const andConditions: PostWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search,
          },
        },
      ],
    });
  }

  if (tags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }

  // isFeatured
  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured,
    });
  }

  // status
  if (status) {
    andConditions.push({
      status,
    });
  }

  // authorId
  if (authorId) {
    andConditions.push({
      authorId,
    });
  }

  //
  const Allpost = await prisma.post.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      _count: {
        select: { comments: true },
      },
    },
  });

  const total = await prisma.post.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: Allpost,
    pagination: {
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
    },
  };
};

// get post by id
// const getPostById = async (postId: string) => {
//   const result = await prisma.$transaction(async (tx) => {
//     await tx.post.update({
//       where: {
//         id: postId,
//       },
//       data: {
//         views: {
//           increment: 1,
//         },
//       },
//     });
//     const postData = await tx.post.findUnique({
//       where: {
//         id: postId,
//       },
//       include: {
//         comments: {
//           where: {
//             parentId: null,
//             status: CommentStatus.APPROVED,
//           },
//           orderBy: { createdAt: "desc" },
//           include: {
//             replies: {
//               where: {
//                 status: CommentStatus.APPROVED,
//               },
//               include: {
//                 replies: true,
//               },
//             },
//           },
//         },
//         _count: {
//           select: { comments: true },
//         },
//       },
//     });
//     return postData;
//   });
//   return result;
// };
const getPostById = async (postId: string) => {
  return prisma.$transaction(async (tx) => {
    const post = await tx.post.findUnique({
      where: { id: postId },
      include: {
        comments: {
          where: {
            parentId: null,
            status: CommentStatus.APPROVED,
          },
          orderBy: { createdAt: "desc" },
          include: {
            replies: {
              where: { status: CommentStatus.APPROVED },
              include: { replies: true },
            },
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    await tx.post.update({
      where: { id: postId },
      data: {
        views: { increment: 1 },
      },
    });

    return post;
  });
};

// get my post
const getMyPost = async (authorId: string) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      id: authorId,
      status: "ACTIVE",
    },
    select: {
      id: true,
      status: true,
    },
  });
  const result = await prisma.post.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  const totalPost = await prisma.post.count({
    where: { authorId },
  });

  return {
    userInfo,
    totalPost,
    result,
  };
};

// user post update

const updatePost = async (
  postId: string,
  data: Partial<Post>,
  authorId: string,
  isAdmin: boolean,
) => {
  const postData = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
    select: {
      id: true,
      authorId: true,
    },
  });
  if (!isAdmin && postData.authorId !== authorId) {
    throw new Error("You are not the owner/create of the post ");
  }

  if (!isAdmin) {
    delete data.isFeatured;
  }

  const result = await prisma.post.update({
    where: {
      id: postData.id,
    },
    data,
  });

  return result;
};

// user post deletede

const deletePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const postData = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  if (!isAdmin && postData.authorId !== authorId) {
    throw new Error("You are not the owner/create of the post ");
  }

  return await prisma.post.delete({
    where: {
      id: postId,
    },
  });
};

export const postService = {
  createPost,
  getAllPost,
  getPostById,
  getMyPost,
  updatePost,
  deletePost,
};
