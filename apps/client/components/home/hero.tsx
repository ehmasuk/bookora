"use client";
import { useTranslations } from "next-intl";

import { GridBg } from "@workspace/ui/components/GridBg";
import { Button } from "@workspace/ui/components/button";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import RegisterModal from "../auth/register-modal";

export default function HeroSection() {
  const t = useTranslations("homepage");

  const { status } = useSession();

  return (
    <GridBg>
      <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center">
        <div className="px-4 py-10 md:py-20">
          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-4xl font-bold text-slate-700 md:text-5xl lg:text-7xl dark:text-slate-300">
            {t("title")
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
          >
            {t("description")}
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {status === "unauthenticated" ? (
              <RegisterModal>
                <Button variant="default" size="lg">
                  {t("hero_buttons.start_writing")}
                </Button>
              </RegisterModal>
            ) : (
              <Link href="/profile">
                <Button variant="default" size="lg">
                  {t("hero_buttons.start_writing")}
                </Button>
              </Link>
            )}
            <Link href="/public-books">
              <Button variant="outline" size="lg">
                {t("hero_buttons.explore_books")}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
              delay: 1.2,
            }}
            className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="group relative w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
              <Image src="/images/hero.png" alt="Landing page preview" className="aspect-video h-auto w-full object-contain" height={1000} width={1000} />
            </div>
          </motion.div>
        </div>
      </div>
    </GridBg>
  );
}
