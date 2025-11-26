"use client";

import { auth } from "@/lib/firebase";
import { signIn } from "@/lib/firebase-auth";
import { onAuthStateChanged } from "firebase/auth";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type FormType = {
  email: string,
  password: string
}


export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingAuthStatus, setLoadingAuthStatus] = useState(true);
  const [form, setForm] = useState<FormType>({
    email: "",
    password: "",
  });

  const isFormFieldEmpty = !form.email || !form.password;


  /**
   * Handles the submission of the sign in form.
   * Prevents the default form submission behavior, logs the form data to the console,
   * calls the signIn function with the form's email and password, and redirects to the homepage
   * if the signIn function returns true.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
   * @throws {FirebaseError} - If there is an error while signing in the user
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("form: ", form);
    try {
      setLoading(true);
      const success = await signIn(form.email, form.password);
      if (success) {
        router.replace("/blogs");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/");
      } else {
        setLoadingAuthStatus(false);
      }
    });

    return () => unsubscribe();
  }, [])



  if (loadingAuthStatus) {
    return (
      <main>
        <div className="w-full h-svh flex-center">
          <Loader className="animate-spin" />
        </div>
      </main>
    )
  }


  return (
    <main className="w-full h-svh flex-center text-center">
      {/** Card */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-foreground/20 rounded-xl p-7">
        <h1 className="text-3xl font-medium">Sign In</h1>
        <p className="text-foreground/80">Welcome to the sign In page</p>

        {/** Email */}
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-foreground/80">Email</label>
          <input value={form.email} required pattern=".+@gmail\.com" onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} type="email" id="email" placeholder="e.g., sudip@email.com" className="h-12 w-full border border-foreground/60 rounded-lg px-3 py-1" />
        </div>

        {/** Password */}
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="password" className="text-foreground/80">Password</label>
          <input value={form.password} required onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))} maxLength={8} minLength={8} type="password" id="password" placeholder="********" className="h-12 w-full border border-foreground/60 rounded-lg px-3 py-1" />
        </div>
        <Link href="/sign-up" className="text-blue-500 hover:underline">New here? Sign Up</Link>


        {/** Button */}
        <button disabled={isFormFieldEmpty || loading} type="submit" className="h-12 w-full bg-foreground text-background rounded-lg font-medium hover:bg-foreground/80 transition-colors duration-300 mt-5 disabled:bg-foreground/50 flex-center">
          {loading ? <Loader className="animate-spin" /> : "Sign In"}</button>
      </form>
    </main>
  )
}
