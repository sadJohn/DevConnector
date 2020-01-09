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
}

const postService = new PostService();

export default postService;
