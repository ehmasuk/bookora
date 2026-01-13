import { BookType } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

function BookCard({ cover, title, id, summary }: BookType) {
  return (
    <div className="relative flex flex-col my-6 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 rounded-lg">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <Image
          loading="lazy"
          src={cover || "/images/deafult-book-cover.png"}
          alt="book-cover"
          width={150}
          height={150}
          className="mx-auto"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <h6 className="text-slate-800 dark:text-white line-clamp-2 font-semibold">
            {title}
          </h6>
        </div>
        {summary.length > 0 && (
          <p className="text-slate-600 dark:text-slate-300 leading-normal font-light">
            {summary}
          </p>
        )}
      </div>
      <Link href={`/book/${id}`} className="px-4 pb-4 pt-0 mt-2">
        <Button variant="primary" className="w-full">
          Edit this book
        </Button>
      </Link>
    </div>
  );
}

export default BookCard;
