'use client';

import { useAuth } from "@/contexts/auth-context";
import { useBlog } from "@/contexts/blog-context";
import { auth } from "@/lib/firebase";
import { getAllBlogs } from "@/lib/firebase-firestore";
import { signOut } from "firebase/auth";
import { Loader, LogIn, LogOut, Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function AllBlogsPage() {
  const { isSignedIn, loadingAuthStatus, setLoadingAuthStatus } = useAuth();
  const { setBlogs, blogs } = useBlog();
  async function logout() {
    try {
      setLoadingAuthStatus(true);
      await signOut(auth);
    } catch {
      console.error("Error signing out.");
    } finally {
      setLoadingAuthStatus(false);
    }
  }


  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogs = await getAllBlogs();
        if(blogs){
          setBlogs(blogs)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchBlogs();
  }, [])

  
  return (
    <div className="w-screen h-svh flex items-center justify-center">
      <div className="w-full md:w-[80%] min-h-svh flex-col gap-7 p-4">
        {blogs?.map((blog) => (
          <Link
            href={`/blogs/${blog.id}`}
            key={blog.content}
            className="w-full"
          >
            <div className="flex-col gap-3 w-full hover:bg-foreground/30 active:bg-foreground/30 p-2 rounded-lg cursor-pointer transition-colors duration-200 ">
              <h1 className="font-medium text-lg">{blog.title}</h1>
              <p>
                {blog.content.length > 90
                  ? blog.content.slice(90) + "..."
                  : blog.content}
              </p>
              <p className="text-foreground/70">{blog.author}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-0 md:w-[20%] h-svh p-4 flex-col border-l border-foreground/20">
        {
          loadingAuthStatus && <div className="flex-1"><Loader className="animate-spin" /></div>
        }
        {
          isSignedIn ? (
            <div className="flex-1">
              <h1 className="text-2xl">Welcome, {auth.currentUser?.email?.split("@")[0]}</h1>
              <h1 className="text-lg">{auth.currentUser?.email}</h1>
              <p className="text-foreground/80 text-sm">{auth.currentUser?.uid}</p>
              <Link href={'/blogs/new'} className="px-2 py-1 rounded-md bg-foreground text-background mt-4 hover:bg-foreground/80 transition-colors duration-300 cursor-pointer flex gap-2 items-center w-fit">
                <Pencil size={20} />
                <span className="text-lg">Write a blog</span>
              </Link>
              <button onClick={logout} className="px-2 py-1 rounded-md bg-red-500 text-white mt-4 hover:bg-red-500/80 transition-colors duration-300 cursor-pointer flex gap-2 items-center">
                <LogOut size={20} />
                <span className="text-lg">Log out</span>
              </button>
            </div>
          ) : (
            <div>
              <h1 className="text-lg">You aren&apos;t signed in. Sign In</h1>
              <Link href={"/sign-in"} className="px-2 py-1 rounded-md bg-foreground text-background mt-4 hover:bg-foreground/80 transition-colors duration-300 cursor-pointer flex gap-2 items-center w-fit">
                <LogIn size={20} />
                <span className="text-lg">Log In</span>
              </Link>
            </div>
          )
        }
      </div>
    </div>
  );
};
