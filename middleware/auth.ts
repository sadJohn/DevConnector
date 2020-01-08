import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

import { AuthRequest, AuthToken } from "../interfaces/auth";
import { RequestUser } from "../interfaces/user";

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = (decoded as AuthToken).user as RequestUser;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};

export default auth;
