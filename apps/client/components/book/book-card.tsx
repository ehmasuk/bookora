"use client"

import useDelete from "@/hooks/useDelete";
import { Button } from "@workspace/ui/components/button";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { mutate } from "swr";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";


type Props = {
    id: string;
    title: string;
    status: string;
}

export default function BookCard({id, title, status}: Props) {


  const {data: session} = useSession()

  const { deleteData } = useDelete();

  const handleDelete = (id:string) => {
    deleteData({
      url: `/book/${id}`,
      onSuccess: () => {
        mutate(`/user/${id}/book`);
      },
    });
  };



  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
      <div className="flex gap-5">
        {/* Book Cover */}
        <div className="flex-shrink-0 relative group">
          <div className="relative w-24 h-38 rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://press.uchicago.edu/dam/ucp/books/jacket/978/02/26/82/9780226822952.jpg"
              alt="Bookora"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="flex-1 flex flex-col">
          {/* Header with bookmark */}
          <div className="flex items-start justify-between mb-4 gap-2">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-slate-900 mb-2">{title}</h1>
              <p className="text-slate-700 mb-1 text-sm">
                <span className=" font-semibold">By</span> {session?.user?.name || 'user'}
              </p>
              <p className="text-slate-600 text-sm mb-2">{status}</p>
            </div>
  

          </div>

          {/* Reviews and Action */}
          <div className="flex items-center justify-between">

            <Link href={`/book/${id}`}>
              <Button variant="default" size="sm" >
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
  )
}
