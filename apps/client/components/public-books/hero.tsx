"use client";

import { cn } from "@/lib/utils"; // Your utility for class names
import { Button } from "@workspace/ui/components/button";
import { motion, Variants } from "motion/react";
import Image from "next/image";
import React from "react";

// Define the props for reusability
interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  stats: StatProps[];
  images: string[];
  className?: string;
  onExploreClick?: () => void;
}

// Animation variants for Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const floatingVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HeroSection = ({ title, subtitle, stats, images, className, onExploreClick }: HeroSectionProps) => {
  return (
    <section className={cn("w-full overflow-hidden bg-background py-12 sm:py-24", className)}>
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        {/* Left Column: Text Content */}
        <motion.div className="flex flex-col items-center text-center lg:items-start lg:text-left" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl" variants={itemVariants}>
            {title}
          </motion.h1>
          <motion.p className="mt-6 max-w-md text-lg text-muted-foreground" variants={itemVariants}>
            {subtitle}
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start" variants={itemVariants}>
            <Button size="lg" onClick={onExploreClick}>
              Explore books
            </Button>
          </motion.div>
          <motion.div className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start" variants={itemVariants}>
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">{stat.icon}</div>
                <div>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Image Collage */}
        <motion.div className="relative h-[400px] w-full sm:h-[500px]" variants={containerVariants} initial="hidden" animate="visible">
          {/* Decorative Shapes */}
          <motion.div className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-blue-200/50 dark:bg-blue-800/30" variants={floatingVariants} animate="animate" />
          <motion.div
            className="absolute bottom-0 right-1/4 h-12 w-12 rounded-lg bg-purple-200/50 dark:bg-purple-800/30"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: "0.5s" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-4 h-6 w-6 rounded-full bg-green-200/50 dark:bg-green-800/30"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: "1s" }}
          />

          {/* Images */}
          {/* Back Book (Center) */}
          <motion.div
            className="absolute left-1/2 top-0 h-64 w-44 -translate-x-1/2 rounded-r-xl bg-muted p-1 shadow-2xl sm:h-80 sm:w-56 border-l-4 border-black/10"
            style={{ transformOrigin: "bottom center", rotate: "-2deg" }}
            variants={imageVariants}
          >
            {images[0] && <Image fill src={images[0]} alt="Book 1" className="h-full w-full rounded-r-lg object-cover" />}
          </motion.div>

          {/* Side Book (Right) */}
          <motion.div
            className="absolute right-4 top-1/4 h-56 w-36 rounded-r-xl bg-muted p-1 shadow-2xl sm:h-72 sm:w-48 border-l-4 border-black/10 z-10"
            style={{ transformOrigin: "left center", rotate: "8deg" }}
            variants={imageVariants}
          >
            {images[1] && <Image fill src={images[1]} alt="Book 2" className="h-full w-full rounded-r-lg object-cover" />}
          </motion.div>

          {/* Front Book (Left) */}
          <motion.div
            className="absolute left-4 bottom-4 h-48 w-32 rounded-r-xl bg-muted p-1 shadow-2xl sm:h-60 sm:w-40 border-l-4 border-black/10 z-20"
            style={{ transformOrigin: "top right", rotate: "-12deg" }}
            variants={imageVariants}
          >
            {images[2] && <Image fill src={images[2]} alt="Book 3" className="h-full w-full rounded-r-lg object-cover" />}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
