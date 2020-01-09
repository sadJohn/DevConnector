import express, { Response, RequestHandler, NextFunction } from "express";
import { check } from "express-validator";

import auth from "../../middleware/auth";
import { AuthRequest } from "../../interfaces/auth";
import authService from "../../services/authService";
import { UserSchema } from "../../interfaces/user";
import postService from "../../services/postService";
import { PostSchema } from "../../interfaces/post";

const router = express.Router();

router.post(
  "/",
  auth as RequestHandler,
  [
    check("text", "Text is required")
      .not()
      .isEmpty()
  ],
  postHandler as RequestHandler
);

async function postHandler(req: AuthRequest, res: Response, _: NextFunction) {
  const user = await authService.fetchAuthUser(req.user.id, res) as UserSchema;

  const newPost = {
      text: req.body.text,
      user: req.user.id,
      name: user.name,
      avatar: user.avatar,
  }
  await postService.createPost(newPost as PostSchema, res);
}

export default router;
