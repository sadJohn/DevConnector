import mongoose, { Document } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date
}

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

const User = mongoose.model<User>("user", UserSchema);

export default User;
