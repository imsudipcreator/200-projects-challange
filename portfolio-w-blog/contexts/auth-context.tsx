"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";


interface AuthContextType {
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    loadingAuthStatus: boolean;
    setLoadingAuthStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType | null>(null)


export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loadingAuthStatus, setLoadingAuthStatus] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsSignedIn(true)
            } else {
                setIsSignedIn(false)
            }
        });

        return () => unsubscribe();
    }, [])
    return (
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, loadingAuthStatus, setLoadingAuthStatus }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthContextProvider.");
    return context;
}