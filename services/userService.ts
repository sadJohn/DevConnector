import { Response } from "express";

import User from "../models/User";
import { UserSchema } from "../interfaces/user";

class UserService {
  async isUserExists(email: string, res: Response) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async createUser(userFeilds: UserSchema, res: Response) {
    try {
      const user = new User(userFeilds);
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  async deleteUser(id: string, res: Response) {
    try {
      await User.findOneAndRemove({ _id: id });
      return res.json({ msg: "User deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
}

const userService = new UserService();

export default userService;
