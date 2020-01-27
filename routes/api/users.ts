import express, { Request, Response } from "express";
import { check } from "express-validator";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";

import userService from "../../services/userService";
import { UserSchema } from "../../interfaces/user";
import authService from "../../services/authService";

const router = express.Router();

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req: Request, res: Response) => {
    const validate = authService.sendValidationResult(req, res);
    if (!validate) return;
  
    const { name, email, password } = req.body;

    try {
      const isUserExists = await userService.isUserExists(email, res);
      if (isUserExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
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
  }
);

export default router;
