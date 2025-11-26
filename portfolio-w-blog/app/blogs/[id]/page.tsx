"use client";

import { useState, use, useEffect } from "react";
import { BlogType } from "@/types/blog-type";
import { deleteBlogwithId, getBlogWithId, getUIDOfBlog } from "@/lib/firebase-firestore";
import MDEditor from '@uiw/react-md-editor';
import { Loader } from "lucide-react";
import Pill from "@/components/pill";
import { useAuth } from "@/contexts/auth-context";
import Button from "@/components/button";
import { useRouter } from "next/navigation";


export default function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const { user } = useAuth();


  async function handleDeleteBlog(){
    console.log("deleting blog");
    try {
      const confirmed = confirm("Are you sure you want to delete this blog?");
      if (!confirmed) return
      const success = await deleteBlogwithId(id);
      if (success) {
        router.replace("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    // find the blog using the id of it
    async function findBlog(id: string) {
      try {
        const foundBlog = await getBlogWithId(id);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          console.log("Blog not found");
          setBlog(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    }

    async function checkIsAuthor() {
      try {
        const uidOfBlog = await getUIDOfBlog(id);
        if (uidOfBlog === user?.uid) {
          setIsAuthor(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    void findBlog(id);
    void checkIsAuthor();
  }, [])

  if (loading) {
    return (
      <div className="w-screen h-svh flex-center">
        <Loader className="animate-spin" />
      </div>
    )
  }
  return (
    <main className="w-full min-h-svh flex items-start justify-center">
      <div className="max-w-[60%] w-full flex flex-col gap-4 py-7">
        {/** Header Section */}
        <header className="flex items-start justify-between">
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="text-5xl font-medium">{blog?.title}</h1>
            <p className="text-lg text-foreground/80">{blog?.author || "Anonymous"} <Pill>Author</Pill></p>
          </div>
          {/** If the user is the author of the blog, show the edit button */}
          {
            isAuthor && (
              <div className="flex gap-2">
                <Button>Edit</Button>
                <Button onClick={handleDeleteBlog}>Delete</Button>
              </div>
            )
          }
        </header>
        <MDEditor.Markdown source={blog?.content} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent', marginTop: 24 }} />
      </div>
    </main>
  )
}
