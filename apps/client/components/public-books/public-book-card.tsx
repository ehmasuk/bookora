"use client";

import { Badge } from "@workspace/ui/components/badge";
import { BookOpen, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PublicBookCardProps {
  id: string;
  title: string;
  authorName: string;
  cover?: string;
}

const PublicBookCard = ({ title, authorName, cover }: PublicBookCardProps) => {
  return (
    <div className="group relative flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl border border-zinc-100 dark:border-zinc-800">
      {/* Book Cover Container */}
      <div className="relative w-full aspect-2/3 rounded-2xl overflow-hidden shadow-lg mb-6 group-hover:shadow-2xl transition-shadow duration-300">
        {cover ? (
          <Image fill src={cover} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-zinc-300 dark:text-zinc-600" />
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link href="/public-books">
            <Badge className="bg-white text-black hover:bg-zinc-200 border-none px-4 py-2 text-sm font-semibold rounded-full shadow-lg">View Details</Badge>
          </Link>
        </div>
      </div>

      {/* Book Details */}
      <div className="w-full text-center">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
        <div className="flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">{authorName}</span>
        </div>
      </div>

      {/* Decorative Gradient Shadow */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-300 -z-10" />
    </div>
  );
};

export default PublicBookCard;
