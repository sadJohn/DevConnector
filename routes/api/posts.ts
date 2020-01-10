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

router.get("/", auth as RequestHandler, async (_, res) => {
  await postService.fetchAllPosts(res);
});

router.get("/:id", auth as RequestHandler, async (req, res) => {
  const post = await postService.fetchPost(req.params.id, res);
  res.json(post);
});

router.delete("/:id", auth as RequestHandler, deleteHandler as RequestHandler);

router.put("/like/:id", auth as RequestHandler, likeHandler as RequestHandler);

router.put("/unlike/:id", auth as RequestHandler, unlikeHandler as RequestHandler);

async function postHandler(req: AuthRequest, res: Response, _: NextFunction) {
  const user = (await authService.fetchAuthUser(
    req.user.id,
    res
  )) as UserSchema;

  const newPost = {
    text: req.body.text,
    user: req.user.id,
    name: user.name,
    avatar: user.avatar
  };
  await postService.createPost(newPost as PostSchema, res);
}

async function deleteHandler(req: AuthRequest, res: Response, _: NextFunction) {
  await postService.deletePost(req.params.id, req.user.id, res);
}

async function likeHandler(req: AuthRequest, res: Response, _: NextFunction) {
  const post = (await postService.fetchPost(req.params.id, res)) as PostSchema;
  const likes = await postService.likePost(post, req.user.id, res);
  res.json(likes);
}

async function unlikeHandler(req: AuthRequest, res: Response, _: NextFunction) {
  const post = (await postService.fetchPost(req.params.id, res)) as PostSchema;
  const likes = await postService.unlikePost(post, req.user.id, res);
  res.json(likes);
}

export default router;
