import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Online Shopping India Mobile, Cameras, Lifestyle & more Online @ Flipkart.com",
  description: "Flipkart.com - India's best website to buy wide range of products including Electronics, Books, Cloths, Accessories, Home furnishing and much more. CoD & Free Shipping. Also try Our APP for seamless Online Shopping experience.",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
