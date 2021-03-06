import { Response } from "express";
import request from "request";

import Profile from "../models/Profile";
import {
  ProfileSchema,
  ExperienceSchema,
  ExperienceDbSchema,
  EducationDbSchema,
  EducationSchema
} from "../interfaces/profile";

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
    console.log(id);
    try {
      const profile = await Profile.findOne({
        user: id
      }).populate("user", ["name", "avatar"]);
      if (!profile) {
        res.status(404).json({ msg: "Profile not found" });
      } else {
        return res.json(profile);
      }
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Profile not found" });
      }
      return res.status(500).send("Server error");
    }
  }

  async createProfile(profileFeilds: ProfileSchema, res: Response) {
    try {
      const profile = new Profile(profileFeilds);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async updateProfile(id: string, profileFeilds: ProfileSchema, res: Response) {
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

  async deleteProfile(id: string, res: Response) {
    try {
      await Profile.findOneAndRemove({ user: id });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async putExperience(id: string, newExp: ExperienceSchema, res: Response) {
    try {
      const profile = (await this.isProfileExists(id, res)) as ProfileSchema;
      profile.experience?.unshift(newExp);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async deleteExperience(id: string, exp_id: string, res: Response) {
    try {
      const profile = (await this.isProfileExists(id, res)) as ProfileSchema;
      const removeIndex = profile.experience
        ?.map(item => (item as ExperienceDbSchema)._id)
        .indexOf(exp_id);
      profile.experience?.splice(removeIndex as number, 1);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async putEducation(id: string, newEdu: EducationSchema, res: Response) {
    try {
      const profile = (await this.isProfileExists(id, res)) as ProfileSchema;
      profile.education?.unshift(newEdu);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async deleteEducation(id: string, edu_id: string, res: Response) {
    try {
      const profile = (await this.isProfileExists(id, res)) as ProfileSchema;
      const removeIndex = profile.education
        ?.map(item => (item as EducationDbSchema)._id)
        .indexOf(edu_id);
      profile.education?.splice(removeIndex as number, 1);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  fetchGithubRepos(username: string, res: Response) {
    const options = {
      method: "GET",
      uri: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.GITHUB_CLIENT_ID
      }&client_secret=${process.env.GITHUB_SECRET}`,
      headers: { "user-agent": "node.js" }
    };
    request(options, (error, response, body) => {
      if (error) {
        console.log(error);
      }
      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "No github profile found" });
      } else {
        return res.json(JSON.parse(body));
      }
    });
  }
}

const profileService = new ProfileService();

export default profileService;
