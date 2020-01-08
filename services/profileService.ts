import { Response } from "express";

import Profile from "../models/Profile";
import { ProfileSchema } from "../interfaces/profile";

class ProfileService {
  async isProfileExists(id: string, res: Response) {
    try {
      return await Profile.findOne({ user: id });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async fetchProfile(id: string, res: Response) {
    console.log(id)
    try {
      const profile = await Profile.findOne({
        user: id
      }).populate("user", ["name", "avatar"]);
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found" });
      }

      return res.json(profile);
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(400).json({ msg: "Profile not found" });
      }
      return res.status(500).send("Server error");
    }
  }

  async createProfile(res: Response, profileFeilds: ProfileSchema) {
    try {
      const profile = new Profile(profileFeilds);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async updateProfile(id: string, res: Response, profileFeilds: ProfileSchema) {
    try {
      const profile = await Profile.findOneAndUpdate(
        { user: id },
        { $set: profileFeilds },
        { new: true }
      );
      return res.json(profile);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async fetchAllProfiles(res: Response) {
    try {
      const profiles = await Profile.find().populate("user", [
        "name",
        "avatar"
      ]);
      return res.json(profiles);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
}

const profileService = new ProfileService();

export default profileService;
