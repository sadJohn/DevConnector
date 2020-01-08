import { Request } from "express";

import { RequestUser } from "./user";

export interface AuthRequest extends Request {
  user: RequestUser;
}

export interface AuthToken {
  user: object;
}
