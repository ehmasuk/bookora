"use client";

import ProfileBooksSkeleton from "@/components/skeletons/profile-books";
import { BookType } from "@/types/book";
import { motion } from "motion/react";
import React from "react";
import useSWR from "swr";
import PublicBookCard from "./public-book-card";

const PublicBooksList = ({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { data: res, error, isLoading } = useSWR("/book?status=public&include=author");

  if (error) return null;

  const books = res?.data || [];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-zinc-50 dark:bg-black py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl mb-4"
          >
            Explore Public Library
          </motion.h2>
          <p className="text-muted-foreground">
            Discover beautiful books created and shared by our community of
            talented authors.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProfileBooksSkeleton key={i} />
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {books.map((book: BookType) => (
              <PublicBookCard
                key={book.id}
                id={book.id}
                title={book.title}
                authorName={
                  typeof book.author === "object"
                    ? book.author.name
                    : "Unknown Author"
                }
                cover={book.cover || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-lg">
              No public books available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicBooksList;
