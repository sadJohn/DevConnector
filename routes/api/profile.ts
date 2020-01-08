import express, { Response, RequestHandler, NextFunction } from "express";

import auth from "../../middleware/auth";
import Profile from "../../models/Profile";
import User from "../../models/User";
import { AuthRequest } from "../../interfaces/auth";
import { ProfileSchema } from "../../interfaces/profile";

const router = express.Router();

const AuthRequestHandler = async (
  req: AuthRequest,
  res: Response,
  _: NextFunction
) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", [
      "name",
      "avatar"
    ]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
router.get("/me", auth as RequestHandler, AuthRequestHandler as RequestHandler);

export default router;
