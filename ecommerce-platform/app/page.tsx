"use client";

import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import ProductSection from "@/components/ProductSection";

export default function Home() {
  return (
    <main className="w-screen flex flex-col items-center justify-start gap-5 bg-[#F1F2F4] min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-5 w-[90%]">
        <HeroCarousel />
        <ProductSection />
      </div>
    </main>

  );
}
