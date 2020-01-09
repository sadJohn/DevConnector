import { Document } from "mongoose";

export interface LikeSchema {
  user: string;
}

export type Like = LikeSchema[];

export interface CommentsSchema {
  user: string;
  text: string;
  name?: string;
  avatar?: string;
  date: Date;
}

export type Comments = CommentsSchema[];

export interface PostSchema extends Document {
  user: string;
  text: string;
  name?: string;
  avatar?: string;
  likes?: Like;
  comments?: Comments;
  date: Date;
}
