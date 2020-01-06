import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction
} from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcryptjs";

import auth from "../../middleware/auth";
import User from "../../models/User";

import { UserInterface, AuthRequest } from "../../interfaces/auth";

const router = express.Router();

const AuthRequestHandler = async (
  req: AuthRequest,
  res: Response,
  _: NextFunction
) => {
  try {
    const user = await User.findById((req.user as UserInterface).id).select(
      "-password"
    );
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

router.get("/", auth as RequestHandler, AuthRequestHandler as RequestHandler);

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };
      const jwtSecret: string = config.get("jwtSecret");
      jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

export default router;
