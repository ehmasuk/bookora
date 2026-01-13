"use client";

import usePost from "@/hooks/usePost";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { ImagePlus, Loader2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

interface Props {
  bookId: string;
  children: React.ReactNode;
  onSuccess?: () => void;
}

export default function BookCoverUploadModal({
  bookId,
  children,
  onSuccess,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { postData, loading: uploading } = usePost();
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 300 * 1024) {
      toast.error("File size is too large. Max 300KB allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("cover", file);

    postData({
      url: `/book/${bookId}/cover`,
      data: formData,
      onSuccess: () => {
        toast.success("Cover updated successfully");
        if (session?.user?.id) {
          mutate(`/user/${session.user.id}/book`);
        }
        onSuccess?.();
        setIsOpen(false);
      },
      onError: (err) => {
        toast.error(err || "Failed to upload cover");
      },
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Book Cover</DialogTitle>
          <DialogDescription>
            Select a high-quality cover for your book. Max file size: 300KB.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

          <div
            onClick={triggerFileInput}
            className="flex flex-col items-center gap-4 cursor-pointer"
          >
            {uploading ? (
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            ) : (
              <div className="p-4 bg-white rounded-full shadow-sm border border-slate-100">
                <ImagePlus className="w-8 h-8 text-primary" />
              </div>
            )}

            <div className="text-center">
              <p className="text-sm font-medium text-slate-900">
                {uploading ? "Uploading cover..." : "Click to select image"}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG or WEBP (aspect ratio 2:3 recommended)
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button onClick={triggerFileInput} disabled={uploading}>
            <Upload className="w-4 h-4 mr-2" />
            Select File
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
