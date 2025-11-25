"use client";

import { auth } from "@/lib/firebase";
import { signUp } from "@/lib/firebase-auth";
import { onAuthStateChanged } from "firebase/auth";
import { Loader } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react"


type FormType = {
    fullname: string,
    email: string,
    password: string
}

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const [loadingAuthStatus, setLoadingAuthStatus] = useState(true);
    const [form, setForm] = useState<FormType>({
        fullname: "",
        email: "",
        password: "",
    })

    const isFormFieldEmpty = !form.fullname || !form.email || !form.password


    /**
     * Handles the submission of the sign up form.
     * Prevents the default form submission behavior, logs the form data to the console,
     * calls the signUp function with the form's email and password, and redirects to the homepage
     * if the signUp function returns true.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
     */
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("form: ", form);
        try {
            setLoading(true);
            const success = await signUp(form.fullname, form.email, form.password);
            if (success) {
                // window.location.replace("/");
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
                window.location.replace("/");
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
                <h1 className="text-3xl font-medium">Sign Up</h1>
                <p className="text-foreground/80">Welcome to the sign up page</p>
                {/** Full Name */}
                <div className="flex flex-col items-start mt-6 gap-2">
                    <label htmlFor="fullname" className="text-foreground/80">Full Name</label>
                    <input value={form.fullname} required onChange={(e) => setForm(prev => ({ ...prev, fullname: e.target.value }))} type="text" id="fullname" placeholder="e.g., Sudip Mahata" className="h-12 w-full border border-foreground/60 rounded-lg px-3 py-1" />
                </div>

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
                <Link href="/sign-in" className="text-blue-500 hover:underline">Already have an account? Sign In</Link>


                {/** Button */}
                <button disabled={isFormFieldEmpty || loading} type="submit" className="h-12 w-full bg-foreground text-background rounded-lg font-medium hover:bg-foreground/80 transition-colors duration-300 mt-5 disabled:bg-foreground/50 flex-center">
                    {loading ? "Loading..." : "Sign Up"}</button>
            </form>
        </main>
    )
}
