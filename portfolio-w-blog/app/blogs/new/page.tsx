"use client";

import { useAuth } from "@/contexts/auth-context";
import { Loader, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { addBlog } from "@/lib/firebase-firestore";


type BlogType = {
    title: string,
    content: string
}

export default function NewBlogPage() {
    const router = useRouter();
    const { isSignedIn, loadingAuthStatus, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [blog, setBlog] = useState<BlogType>({
        title: "",
        content: ""
    });
    if (!isSignedIn && !loadingAuthStatus) {
        router.replace("/sign-in");
        return (
            <div className="w-full h-svh flex-center">
                <Loader className="animate-spin" />
            </div>
        )
    }

    async function createNewBlog() {
        setLoading(true);
        if(!user){
            console.error("Auth Error:user not found!!");
            // router.replace("/sign-in");
            return
        }
        try {
            const success = await addBlog(blog.title, blog.content, user.uid);
            if(success){
                router.replace("/blogs");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="w-full h-svh flex flex-col relative">
            <MDEditor
                value={blog.content}
                style={{ height: "100svh" }}
                onChange={(e) => setBlog(prev => ({ ...prev, content: e ?? "" }))}
                className="w-full h-full!"
            />
            <button onClick={() => setShowPopup(true)} disabled={blog.content.length < 30} className="absolute bottom-5 right-5 px-2.5 py-2 bg-foreground text-background rounded-lg transition-colors duration-300 hover:bg-foreground/80 disabled:bg-foreground/50">
                Continue
            </button>
            <div className={`${showPopup ? "flex" : "hidden"} w-full h-svh flex-center bg-foreground/30 backdrop-blur-2xl absolute`}>
                <div className={`rounded-xl bg-foreground/10 p-10 flex-col-center gap-3 absolute z-100 `}>
                    <h1 className="text-foreground text-2xl font-medium">Create New Blog</h1>
                    {/** Author */}
                    <div className="flex flex-col items-start gap-2 mt-5">
                        <label htmlFor="author" className="text-foreground/80">Author*</label>
                        <input disabled value={user?.fullname ?? "unknown"} required type="text" id="author" className="h-12 w-full border border-foreground/60 rounded-lg px-3 py-1 disabled:text-foreground/70" />
                    </div>
                    {/** Title */}
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="title" className="text-foreground/80">Title*</label>
                        <input value={blog.title} required onChange={(e) => setBlog(prev => ({ ...prev, title: e.target.value }))} type="text" id="title" placeholder="e.g., The Heroic Adventures of Superman" className="h-12 w-full border border-foreground/60 rounded-lg px-3 py-1" />
                    </div>
                    <div className="items-center gap-2 grid grid-cols-2 w-full">
                        <button disabled={loading} onClick={() => setShowPopup(false)} className="col-span-1 bg-background/70 text-foreground hover:bg-background/60 rounded-lg flex-center px-3 py-2">
                            Cancel
                        </button>
                        <button onClick={createNewBlog} disabled={!blog.title} className="col-span-1 bg-foreground text-background disabled:bg-foreground/50 rounded-lg flex-center px-3 py-2 flex-center">
                            {loading ? <Loader className="animate-spin" /> : "Continue"}
                        </button>
                    </div>

                    <button onClick={()=> setShowPopup(false)} className="flex-center absolute top-5 right-5 cursor-pointer rounded-md hover:bg-foreground/10 p-1">
                        <X className="text-foreground"/>
                    </button>
                </div>
            </div>
        </main>
    )
}
