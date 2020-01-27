import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/User";

class AuthService {
  async fetchAuthUser(id: string, res: Response) {
    try {
      return await User.findById(id).select("-password");
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }

  sendJWTToken(id: string, res: Response) {
    const payload = {
      user: { id }
    };
    const jwtSecret = process.env.JWTSECRET as string;
    jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  }

  sendValidationResult(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      return true;
    }
  }
}

const authService = new AuthService();

export default authService;
