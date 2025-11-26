import { UserType } from "./user-type";

export type BlogType = {
  id: string;
  author: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
