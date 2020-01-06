import { Request } from "express";

export interface UserInterface {
  id: string;
}

export interface AuthRequest extends Request {
  user: UserInterface;
}

export interface AuthToken {
  user: object;
}
