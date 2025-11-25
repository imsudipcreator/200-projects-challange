"use client";

import React, { createContext, useState, useContext } from "react";
import type { BlogType } from "@/types/blog-type.d.ts";
import { Blogs } from "@/data/demo-blog";

interface BlogContextType {
  blogs: BlogType[] | null;
  setBlogs: React.Dispatch<React.SetStateAction<BlogType[] | null>>
  activeBlog: BlogType | null;
  setActiveBlog: React.Dispatch<React.SetStateAction<BlogType | null>>
}

const BlogContext = createContext<BlogContextType | null>(null);

export const BlogContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [blogs, setBlogs] = useState<BlogType[] | null>([]);
  const [activeBlog, setActiveBlog] = useState<BlogType | null>(null);
  return (
    <BlogContext.Provider value={{ blogs, setBlogs, activeBlog, setActiveBlog }}>
      {children}
    </BlogContext.Provider>
  )
}


export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlog must be used within a BlogContextProvider.");
  return context;
}
