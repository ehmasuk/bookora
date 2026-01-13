"use client";

import { Features } from "@/components/home/features";
import HeroSection from "@/components/home/hero";
import { ReviewsSection } from "@/components/home/reviews";

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
