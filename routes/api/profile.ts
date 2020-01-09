import express, { Response, RequestHandler, NextFunction } from "express";
import { check } from "express-validator";

import auth from "../../middleware/auth";
import { AuthRequest } from "../../interfaces/auth";
import { ProfileSchema, Social } from "../../interfaces/profile";
import profileService from "../../services/profileService";
import userService from "../../services/userService";
import authService from "../../services/authService";

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

router.put(
  "/experience",
  auth as RequestHandler,
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("company", "Company is requied")
      .not()
      .isEmpty(),
    check("from", "From date is required")
      .not()
      .isEmpty()
  ],
  putExperience as RequestHandler
);

router.delete(
  "/experience/:exp_id",
  auth as RequestHandler,
  deleteExpHandler as RequestHandler
);

router.delete(
  "/education/:edu_id",
  auth as RequestHandler,
  deleteEduHandler as RequestHandler
);

router.put(
  "/education",
  auth as RequestHandler,
  [
    check("school", "School is required")
      .not()
      .isEmpty(),
    check("degree", "Degree is requied")
      .not()
      .isEmpty(),
    check("fieldofstudy", "Fieldofstudy is required")
      .not()
      .isEmpty(),
    check("from", "From date is required")
      .not()
      .isEmpty()
  ],
  putEducation as RequestHandler
);

router.get("/github/:username", (req, res) => {
  profileService.fetchGithubRepos(req.params.username, res);
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
  authService.sendValidationResult(req, res);

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

async function putExperience(req: AuthRequest, res: Response, _: NextFunction) {
  authService.sendValidationResult(req, res);

  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };
  await profileService.putExperience(req.user.id, newExp, res);
}

async function deleteExpHandler(
  req: AuthRequest,
  res: Response,
  _: NextFunction
) {
  await profileService.deleteExperience(req.user.id, req.params.exp_id, res);
}

async function deleteEduHandler(
  req: AuthRequest,
  res: Response,
  _: NextFunction
) {
  await profileService.deleteEducation(req.user.id, req.params.edu_id, res);
}

async function putEducation(req: AuthRequest, res: Response, _: NextFunction) {
  authService.sendValidationResult(req, res);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };
  await profileService.putEducation(req.user.id, newEdu, res);
}

export default router;
