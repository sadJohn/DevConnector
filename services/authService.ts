import { Response } from "express";
import config from "config";
import jwt from "jsonwebtoken";

import User from "../models/User";

class AuthService {
  async fetchAuthUser(id: string, res: Response) {
    console.log(id)
    try {
      const user = await User.findById(id).select("-password");
      return res.json(user);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }

  sendJWTToken(id: string, res: Response) {
    const payload = {
      user: { id }
    };
    const jwtSecret: string = config.get("jwtSecret");
    jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  }
}

const authService = new AuthService();

export default authService;
