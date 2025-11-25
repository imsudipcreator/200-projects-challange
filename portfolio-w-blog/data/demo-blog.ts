import type { BlogType } from "../types/blog-type.d.ts";
import { v4 as uuid } from "uuid";

export const Blogs: BlogType[] = [
  {
    id: uuid(),
    author: "Sudip Mahata",
    title: "Greeting Blog",
    content: "# Hello\n## How are you.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuid(),
    author: "Anushka Sharma",
    title: "Greeting Blog #2",
    content: "# Hey, how is it goin' pal!",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuid(),
    author: "Kelly Rod",
    title: "How to increase reach in X (formerly twitter) in 1 month.",
    content: "Everyone wants to increase reach but no one knows the exact path to that goal cause it doesn't exist.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuid(),
    author: "Alok Daniels",
    title: "How to hack free fire.",
    content: "How to hack free fire",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
