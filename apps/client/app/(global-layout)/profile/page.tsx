"use client";

import CreateBookModal from "@/components/modals/CreateBookModal";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Edit, Plus, Trash, User } from "lucide-react";

import Empty from "@/components/global/Empty";
import { Button } from "@workspace/ui/components/button";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";

import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import useDelete from "@/hooks/useDelete";
import { BookType } from "@/types/book";
import { BookCard } from "@workspace/ui/components/profile-book-cards";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function BookManagementDashboard() {
  const { data: session } = useSession();
  const t = useTranslations("profilepage");
  const router = useRouter();
  const { deleteData } = useDelete();

  const userId = session?.user?.id;

  const { data: res, error, isLoading } = useSWR(userId ? `/user/${userId}/book` : null);

  if (error) {
    toast.error(error.message);
  }

  const books = res?.data;


  const handleDelete = (id:string) => {
    deleteData({
      url: `/book/${id}`,
      onSuccess: () => {
        mutate(`/user/${id}/book`);
      },
    });
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto bg-background">
      <div className="p-8">
        {/* Top Header */}
        {/* hidden */}
        {/* hidden */}
        {/* hidden */}
        <div className="hidden">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{session?.user?.name || ""}</p>
              <p className="text-xs text-muted-foreground truncate">{session?.user?.email || ""}</p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center pb-4 justify-between border-b mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{t("header.title")}</h2>
            <p className="text-muted-foreground">{t("header.description")}</p>
          </div>

          <CreateBookModal>
            <Button variant="black">
              {t("header.create_button")} <Plus />
            </Button>
          </CreateBookModal>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 px-3 gap-6">
          {userId && books?.map((book: BookType, index: number) =>(
            <BookCard
            id={book.id} title={book.title} key={index}
            author={book.author}
            coverImage={""}
            summary={book.summary}
            status={"public"}

            EditComponent={<Link href={`/book/${book.id}`}>
        <Button variant='ghost' size='sm'>
          <Edit size={15} />
          Edit
        </Button>
      </Link>}
          DeleteComponent={<DeleteConfirmationModal onConfirm={() => handleDelete(book.id)} text="Are you sure you want to delete this book?">
        <Button variant='ghost' size='sm'>
          <Trash size={15} />
          Delete
        </Button>
      </DeleteConfirmationModal>}





          />
          ))}
        </div>






{/* 
      <div className="mt-5">
          <BookCards books={books || []} />
          <div className="flex flex-col gap-5 max-w-4xl mx-auto">
            {isLoading && [...Array(5)].map((_, i) => <Skeleton key={i} className="w-full h-20" />)}
          </div>
        </div> */}



        {!isLoading && books?.length === 0 && <Empty size="lg" text={t("empty_message")} />}
      </div>
    </div>
  );
}
