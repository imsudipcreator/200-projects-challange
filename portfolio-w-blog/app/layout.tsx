import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { BlogContextProvider } from "@/contexts/blog-context";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/auth-context";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "500", "800"]
})

export const metadata: Metadata = {
  title: "@imsudipdev | Portfolio",
  description: "A CRUD blog integrated portfolio for imsudipdev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AuthContextProvider>
          <BlogContextProvider>
            {children}
          </BlogContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
