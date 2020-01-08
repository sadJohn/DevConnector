import mongoose from "mongoose";

import { UserSchema as UserModel } from "../interfaces/user";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  data: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model<UserModel>("user", UserSchema);

export default User;
