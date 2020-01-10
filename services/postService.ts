import { Response } from "express";

import { PostSchema } from "../interfaces/post";
import Post from "../models/Post";

class PostService {
  async createPost(postFeilds: PostSchema, res: Response) {
    try {
      const post = new Post(postFeilds);
      await post.save();
      return res.json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async fetchAllPosts(res: Response) {
    try {
      const posts = await Post.find().sort({ data: -1 });
      return res.json(posts);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async fetchPost(id: string, res: Response) {
    try {
      const post = await Post.findById(id);
      if (!post) {
        res.status(404).json({ msg: "Post not found" });
      } else {
        return post;
      }
    } catch (error) {
      console.log(error);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      return res.status(500).send("Server error");
    }
  }

  async deletePost(id: string, user: string, res: Response) {
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      if (post.user.toString() !== user) {
        return res.status(401).json({ msg: "User not authorized" });
      }
      await post.remove();
      return res.json({ msg: "Post removed" });
    } catch (error) {
      console.log(error);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      return res.status(500).send("Server error");
    }
  }

  async likePost(post: PostSchema, id: string, res: Response) {
    try {
      const alreadyliked = !!post.likes?.find(
        like => like.user.toString() === id
      );
      if (alreadyliked) {
        res.status(400).json({ msg: "Post already liked" });
      } else {
        post.likes?.unshift({ user: id });
        await post.save();
        return post.likes;
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async unlikePost(post: PostSchema, id: string, res: Response) {
    try {
      const removeIndex = post.likes?.findIndex(
        like => like.user.toString() === id
      );
      if (removeIndex === -1) {
        res.status(400).json({ msg: "Post has not yet been liked" });
      } else {
        post.likes?.splice(removeIndex as number);
        await post.save();
        return post.likes;
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
}

const postService = new PostService();

export default postService;
