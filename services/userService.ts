import { Response } from "express";

import User from "../models/User";
import { UserSchema } from "../interfaces/user";

class UserService {
  async isUserExists(res: Response, email: string) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async createUser(res: Response, userFeilds: UserSchema) {
    try {
      const user = new User(userFeilds);
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
}

const userService = new UserService();

export default userService;
