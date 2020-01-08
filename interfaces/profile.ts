import { Document } from "mongoose";

export interface ExperienceSchema {
  title: string;
  company: string;
  location?: string;
  from: Date;
  to?: Date;
  current: boolean;
  description?: string;
}

export type Experience = ExperienceSchema[];

export interface EducationSchema {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to?: Date;
  current: boolean;
  description?: string;
}

export type Education = EducationSchema[];

export interface Social {
  yutube?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}

export interface ProfileSchema extends Document {
  user: string;
  company?: string;
  website?: string;
  loacation?: string;
  status: string;
  skills: string[];
  bio?: string;
  githubusername?: string;
  experience?: Experience;
  education?: Education;
  social?: Social;
  date?: Date;
}
