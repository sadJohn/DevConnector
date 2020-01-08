import { Document } from "mongoose";

export interface UserSchema extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}

export interface RequestUser {
    id: string;
}
