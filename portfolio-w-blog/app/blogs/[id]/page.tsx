"use client";

import { useState, use } from "react";
import { Blogs } from "@/data/demo-blog";
import type { BlogType } from "@/types/blog-type.d.ts";

export default function BlogPage({params}: {params: Promise<{id : string}>}){
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogType | null>(null);
  // find the blog using the id of it
  function findBlog(id: string){
    const blog = Blogs.find((blog) => blog.id === id);
    if(!blog)
      setBlog(null);
    else
      setBlog(blog);

    setLoading(false);

  }

  if(loading){
    return (
      <div className="w-screen h-svh flex-center">
        <h1 className="font-medium text-foreground/80 text-xl animate-pulse">Loading...</h1>
      </div>
    )
  }
  return (
    <div>{id}</div>
  )
}
