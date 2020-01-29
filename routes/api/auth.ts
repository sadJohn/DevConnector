import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction
} from "express";
import bcrypt from "bcryptjs";

import auth from "../../middleware/auth";

import { AuthRequest } from "../../interfaces/auth";
import { UserSchema } from "../../interfaces/user";
import userService from "../../services/userService";
import authService from "../../services/authService";

const router = express.Router();

router.get("/", auth as RequestHandler, AuthRequestHandler as RequestHandler);

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userService.isUserExists(email, res);
    if (!user) {
      return res.status(400).send( "Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(
      password,
      (user as UserSchema).password
    );
    if (!isMatch) {
      return res.status(400).send("Invalid Credentials");
    }

    authService.sendJWTToken((user as UserSchema).id, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

async function AuthRequestHandler(
  req: AuthRequest,
  res: Response,
  _: NextFunction
) {
  const user = await authService.fetchAuthUser(req.user.id, res);
  res.json(user);
}

export default router;
