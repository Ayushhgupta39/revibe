"use server";

import { revalidatePath } from "next/cache";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { connectDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string;
  path: string;
}

export async function fetchPostById(id: string) {
  connectDB();

  try {
    // TODO: populate community
    const post = await Post.findById(id).populate({
      path: "author",
      model: User,
      select: "_id id name image"
    })
    .populate({
      path: "children",
      populate: [
        {
          path: "author",
          model: User,
          select: "_id id name parentId image"
        }, 
        {
          path: "children",
          model: Post,
          populate: {
            path: "author",
            model: User,
            select: "_id id name parentId image"
          }
        }
      ]
    }).exec();

    return post;
  } catch (error: any) {
    throw new Error(`Error while fetching post: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    await connectDB();

    // Calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch the posts that have no parents (top-level posts)
    const postsQuery = Post.find({ parentId: { $in: [null, undefined] } })
      .sort({
        createdAt: "desc",
      })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({ path: "children", populate: {
        path: "author",
        model: User,
        select: "_id name parentId image"
      }})

      const totalPostsCount = await Post.countDocuments({ parentId: {$in: [null, undefined]} })

      const posts = await postsQuery.exec();

      const isNext = totalPostsCount > skipAmount + posts.length;

      return { posts, isNext };
  } catch (error: any) {
    throw new Error(`Error while fetching posts: ${error.message}`);
  }
}

export async function createPost({ text, author, communityId, path }: Params) {
  try {
    await connectDB();

    const createdPost = await Post.create({
      text,
      author,
      community: null,
    });

    // Update user model
    await User.findByIdAndUpdate(author, {
      $push: { posts: createdPost._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating post: ${error.message}`);
  }
}

export async function addCommentToPost(postId: string, commentText: string, userId: string, path: string) {
  connectDB();

  try {
    const originalPost = await Post.findById(postId);

    if (!originalPost) {
      throw new Error("Post not found.");
    }

    const commentPost = new Post({
      text: commentText,
      author: userId,
      parentId: postId
    })

    const savedCommentPost = await commentPost.save();

    originalPost.children.push(savedCommentPost._id);

    await originalPost.save();
    
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment: ${error.message}`);
  }
}