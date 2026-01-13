"use client";

import useUpdate from "@/hooks/useUpdate";
import { BookType } from "@/types/book";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Globe,
  Loader2,
  Lock,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";

interface Props {
  bookId: string;
  children: React.ReactNode;
}

export default function BookStatusModal({ bookId, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { updateData, loading: updating } = useUpdate();

  const { data: bookResponse, isLoading } = useSWR<{ data: BookType }>(
    isOpen ? `/book/${bookId}` : null,
  );

  const book = bookResponse?.data;

  // Validation logic
  const hasCover = !!book?.cover;

  const canPublish = hasCover;
  const currentStatus = book?.status || "private";

  const toggleStatus = () => {
    const newStatus = currentStatus === "public" ? "private" : "public";

    if (newStatus === "public" && !canPublish) {
      toast.error("Please meet all requirements before publishing.");
      return;
    }

    updateData({
      endpoint: `/book/${bookId}`,
      data: { status: newStatus },
      onSuccess: () => {
        toast.success(`Book is now ${newStatus}`);
        mutate(`/book/${bookId}?include=chapters,chapters.sections`);
        if (session?.user?.id) {
          mutate(`/user/${session.user.id}/book`);
        }
        setIsOpen(false);
      },
      onError: () => {
        // useUpdate already shows a generic toast
      },
    });
  };

  const Requirement = ({ met, label }: { met: boolean; label: string }) => (
    <div className="flex items-center gap-3 py-2">
      {met ? (
        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
      ) : (
        <Circle className="w-5 h-5 text-slate-300 shrink-0" />
      )}
      <span
        className={`text-sm ${met ? "text-slate-900 font-medium" : "text-slate-500"}`}
      >
        {label}
      </span>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Book Status</DialogTitle>
          <DialogDescription>
            Switch your book between private and public visibility.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 mb-6">
            <div className="flex items-center gap-3">
              {currentStatus === "public" ? (
                <Globe className="w-5 h-5 text-blue-500" />
              ) : (
                <Lock className="w-5 h-5 text-slate-500" />
              )}
              <div>
                <p className="text-sm font-semibold text-slate-900 capitalize">
                  {currentStatus}
                </p>
                <p className="text-xs text-slate-500">
                  {currentStatus === "public"
                    ? "Visible to everyone"
                    : "Only you can see this"}
                </p>
              </div>
            </div>
            <Badge
              variant={currentStatus === "public" ? "default" : "secondary"}
            >
              {currentStatus}
            </Badge>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              Publishing Checklist
              {!canPublish && currentStatus === "private" && (
                <span className="text-[10px] font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                  Action Required
                </span>
              )}
            </h4>

            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
              </div>
            ) : (
              <>
                <Requirement met={hasCover} label="Book cover image uploaded" />

                {!canPublish && currentStatus === "private" && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Your book must meet all the requirements above before it
                      can be published to the public gallery.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={updating}
          >
            Cancel
          </Button>
          <Button
            onClick={toggleStatus}
            disabled={
              updating ||
              (currentStatus === "private" && !canPublish) ||
              isLoading
            }
            variant={currentStatus === "public" ? "secondary" : "default"}
          >
            {updating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : currentStatus === "public" ? (
              <Lock className="w-4 h-4 mr-2" />
            ) : (
              <Globe className="w-4 h-4 mr-2" />
            )}
            {currentStatus === "public" ? "Make Private" : "Publish to Public"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
