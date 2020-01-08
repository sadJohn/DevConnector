import express, { Response, RequestHandler, NextFunction } from "express";
import { check, validationResult } from "express-validator";

import auth from "../../middleware/auth";
import Profile from "../../models/Profile";
import User from "../../models/User";
import { AuthRequest } from "../../interfaces/auth";
import { ProfileSchema, Social } from "../../interfaces/profile";

const router = express.Router();

const getProfileHandler = async (
  req: AuthRequest,
  res: Response,
  _: NextFunction
) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

const postProfileHandler = async (
  req: AuthRequest,
  res: Response,
  _: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    website,
    loacation,
    status,
    skills,
    bio,
    githubusername,
    yutube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = req.body;

  const profileFeilds = {} as ProfileSchema;
  profileFeilds.user = req.user.id;
  profileFeilds.status = status;
  profileFeilds.skills = skills
    .split(",")
    .map((skill: string) => skill.trim());
  if (company) profileFeilds.company = company;
  if (website) profileFeilds.website = website;
  if (loacation) profileFeilds.loacation = loacation;
  if (bio) profileFeilds.bio = bio;
  if (githubusername) profileFeilds.githubusername = githubusername;

  profileFeilds.social = {} as Social;
  if (yutube) profileFeilds.social.yutube = yutube;
  if (twitter) profileFeilds.social.twitter = twitter;
  if (facebook) profileFeilds.social.facebook = facebook;
  if (linkedin) profileFeilds.social.linkedin = linkedin;
  if (instagram) profileFeilds.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFeilds },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFeilds);
    await profile.save();
    return res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
router.get("/me", auth as RequestHandler, getProfileHandler as RequestHandler);

router.post(
  "/",
  auth as RequestHandler,
  [
    check("status", "Status is required")
      .not()
      .isEmpty(),
    check("skills", "Skills is required")
      .not()
      .isEmpty()
  ],
  postProfileHandler as RequestHandler
);

export default router;
