import express, { Response, RequestHandler, NextFunction } from "express";
import { check, validationResult } from "express-validator";

import auth from "../../middleware/auth";
import { AuthRequest } from "../../interfaces/auth";
import { ProfileSchema, Social } from "../../interfaces/profile";
import profileService from "../../services/profileService";
import userService from "../../services/userService";

const router = express.Router();

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

router.get("/", async (_, res) => {
  await profileService.fetchAllProfiles(res);
});

router.get("/user/:user_id", async (req, res) => {
  await profileService.fetchProfile(req.params.user_id, res);
});

router.delete("/", auth as RequestHandler, async (req, res) => {
  await profileService.deleteProfile((req as AuthRequest).user.id, res);
  await userService.deleteUser((req as AuthRequest).user.id, res);
});

async function getProfileHandler(
  req: AuthRequest,
  res: Response,
  _: NextFunction
) {
  await profileService.fetchProfile(req.user.id, res);
}

async function postProfileHandler(
  req: AuthRequest,
  res: Response,
  _: NextFunction
) {
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
  profileFeilds.skills = skills.split(",").map((skill: string) => skill.trim());
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

  const isProfileExist = await profileService.isProfileExists(req.user.id, res);
  if (isProfileExist) {
    return await profileService.updateProfile(req.user.id, profileFeilds, res);
  }
  await profileService.createProfile(profileFeilds, res);
}

export default router;
