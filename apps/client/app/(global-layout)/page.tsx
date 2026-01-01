"use client";

import { Features } from "@/components/Feautres";
import HeroSection from "@/components/HeroSection";
import { ReviewsSection } from "@/components/ReviewsSection";

function HomePage() {
  return (
    <main>
      <HeroSection />
      <Features />
      <ReviewsSection />
    </main>
  );
}

export default HomePage;
