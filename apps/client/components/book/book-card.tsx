"use client";

import useDelete from "@/hooks/useDelete";
import { IconLock, IconWorld } from "@tabler/icons-react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { ImagePlus, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { mutate } from "swr";
import BookCoverUploadModal from "../modals/BookCoverUploadModal";
import BookStatusModal from "../modals/BookStatusModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import Image from "next/image";

type Props = {
  id: string;
  title: string;
  status: string;
  cover?: string;
};

export default function BookCard({ id, title, status, cover }: Props) {
  const { data: session } = useSession();

  const { deleteData } = useDelete();

  const handleDelete = (id: string) => {
    deleteData({
      url: `/book/${id}`,
      onSuccess: () => {
        if (session?.user?.id) {
          mutate(`/user/${session.user.id}/book`);
        }
      },
    });
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
      <div className="flex gap-5">
        {/* Book Cover */}
        <div className="shrink-0 relative group">
          <BookCoverUploadModal bookId={id}>
            <div
              className={`relative w-24 h-38 rounded-lg overflow-hidden shadow-2xl cursor-pointer border border-dashed border-slate-200 transition-all hover:border-primary group/cover ${!cover ? "bg-slate-50" : ""}`}
            >
              {cover ? (
                <Image fill src={cover} alt={title} className="object-cover w-full h-full transition-transform group-hover/cover:scale-105" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2 p-2 text-center">
                  <ImagePlus className="w-6 h-6 text-slate-400" />
                  <span className="text-[10px] font-medium text-slate-500">Upload Cover</span>
                </div>
              )}

              <div className="absolute inset-0 bg-black/0 group-hover/cover:bg-black/70 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover/cover:opacity-100 text-white text-[10px] font-bold uppercase tracking-wider transition-opacity">Change</span>
              </div>
            </div>
          </BookCoverUploadModal>
        </div>

        {/* Book Details */}
        <div className="flex-1 flex flex-col">
          {/* Header with bookmark */}
          <div className="flex items-start justify-between mb-4 gap-2">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-slate-900 mb-2">{title}</h1>
              <p className="text-slate-700 mb-1 text-sm">
                <span className=" font-semibold">By</span> {session?.user?.name || "user"}
              </p>
              <BookStatusModal bookId={id}>
                <div className="cursor-pointer inline-block mt-1">
                  <Badge variant="outline">
                    {status === "public" ? <IconWorld color="green" /> : <IconLock color="red" />}
                    {status}
                  </Badge>
                </div>
              </BookStatusModal>
            </div>
          </div>

          {/* Reviews and Action */}
          <div className="flex items-center justify-between">
            <Link href={`/book/${id}`}>
              <Button variant="default" size="sm">
                Continue Writing
              </Button>
            </Link>
            <DeleteConfirmationModal onConfirm={() => handleDelete(id)} text="Are you sure you want to delete this book?">
              <Button variant="secondary" size="sm" className="hover:text-red-500">
                <Trash />
              </Button>
            </DeleteConfirmationModal>
          </div>
        </div>
      </div>
    </div>
  );
}
