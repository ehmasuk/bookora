"use client";

import ProfileBook from "@/components/global/ProfileBook";
import CreateBookModal from "@/components/modals/CreateBookModal";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Plus, User } from "lucide-react";

import Empty from "@/components/global/Empty";
import { BookType } from "@/types/book";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import useSWR from "swr";

export default function BookManagementDashboard() {
  const { data: session } = useSession();
  const t = useTranslations("profilepage");

  const userId = session?.user?.id;

  const { data: res, error, isLoading } = useSWR(userId ? `/user/${userId}/book` : null);

  if (error) {
    toast.error(error.message);
  }

  const books = res?.data;

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

          <CreateBookModal eligableToShowStepsGuide={books?.length === 0 ? true : false} tooltip={false}>
            <Button variant="black">
              {t("header.create_button")} <Plus />
            </Button>
          </CreateBookModal>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 px-3 gap-6">
          {userId && books?.map((book: BookType, index: number) => <ProfileBook userId={userId} bookId={book.id} title={book.title} key={index} />)}

          {isLoading && [...Array(5)].map((_, i) => <Skeleton key={i} className="w-full h-30" />)}
        </div>

        {!isLoading && books?.length === 0 && <Empty size="lg" text={t("empty_message")} />}
      </div>
    </div>
  );
}
