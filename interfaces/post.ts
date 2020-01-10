import { Document } from "mongoose";

export interface LikeSchema {
  user: string;
}

export type Like = LikeSchema[];

export interface CommentSchema {
  user: string;
  text: string;
  name?: string;
  avatar?: string;
  date: Date;
}

export interface CommentDbSchema extends CommentSchema {
  _id?: string
}

export type Comments = CommentSchema[];

export interface PostSchema extends Document {
  user: string;
  text: string;
  name?: string;
  avatar?: string;
  likes?: Like;
  comments?: Comments;
  date: Date;
}
