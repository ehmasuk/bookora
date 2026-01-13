"use client";

import HeroSection from "@/components/public-books/hero";
import PublicBooksList from "@/components/public-books/public-books-list";
import { Briefcase, Users } from "lucide-react";
import { useRef } from "react";

const PublicBooksPage = () => {
  const booksSectionRef = useRef<HTMLDivElement>(null);

  const handleExploreClick = () => {
    booksSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const heroData = {
    title: (
      <>
        Explore our collection of <br /> public books
      </>
    ),
    subtitle:
      "EduFlex provides a platform for writers to share their knowledge. Browse through various books and materials from our community.",
    stats: [
      {
        value: "150+",
        label: "Active writers",
        icon: <Users className="h-5 w-5 text-muted-foreground" />,
      },
      {
        value: "400+",
        label: "Public Books",
        icon: <Briefcase className="h-5 w-5 text-muted-foreground" />,
      },
    ],
    images: [
      "https://blog-cdn.reedsy.com/directories/gallery/248/large_65b0ae90317f7596d6f95bfdd6131398.jpg",
      "https://blog-cdn.reedsy.com/directories/gallery/294/large_41212c037ab6d53f97027d0293099b31.jpg",
      "https://blog-cdn.reedsy.com/directories/gallery/118/large_52ecd3c8a4ca8bd258bed44d68cc6c63.jpg",
    ],
  };

  return (
    <div className="flex flex-col">
      <HeroSection
        title={heroData.title}
        subtitle={heroData.subtitle}
        stats={heroData.stats}
        images={heroData.images}
        onExploreClick={handleExploreClick}
      />
      <PublicBooksList sectionRef={booksSectionRef} />
    </div>
  );
};

export default PublicBooksPage;
