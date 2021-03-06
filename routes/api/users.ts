import express, { Request, Response } from "express";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";

import userService from "../../services/userService";
import { UserSchema } from "../../interfaces/user";
import authService from "../../services/authService";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const isUserExists = await userService.isUserExists(email, res);
    if (isUserExists) {
      return res.status(400).send("User already exists");
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userService.createUser(
      {
        name,
        email,
        avatar,
        password: hashedPassword
      } as UserSchema,
      res
    );

    authService.sendJWTToken((user as UserSchema).id, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

export default router;
