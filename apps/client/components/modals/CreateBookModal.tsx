"use client";

import usePost from "@/hooks/usePost";
import { BookType } from "@/types/book";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { BookMarkedIcon } from "lucide-react";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  children: React.ReactNode;
  tooltip?: boolean;
  eligableToShowStepsGuide?: boolean;
}

interface NewBookResponse {
  code: number;
  message: string;
  data: BookType;
}

function CreateBookModal({ children, tooltip = true }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const { postData, loading } = usePost();

  const formSchema = z.object({
    title: z.string().min(1, { message: "Book name is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const book = { title: values.title };

    postData<NewBookResponse>({
      url: "/book",
      data: book,
      onSuccess: (res) => {
        toast.success("Book created successfully");
        const { id: newBookId } = res?.data;
        router.push(`/book/${newBookId}`);
        setIsOpen(false);
      },
      onError: (errMessage) => {
        toast.error(errMessage);
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip delayDuration={1000}>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>{children}</DialogTrigger>
          </TooltipTrigger>
          {tooltip && (
            <TooltipContent className="bg-slate-700 text-slate-100 rounded px-2 py-1 text-xs">
              <p>Create a new Book</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="w-sm">
        <div className="mb-2 flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="sm:text-center">Create a new book</DialogTitle>
            <DialogDescription className="sm:text-center">Enter book name and start writing.</DialogDescription>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input className="peer ps-9" placeholder="Book name" type="text" {...field} />
                      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                        <BookMarkedIcon size={16} aria-hidden="true" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button loading={loading} variant="primary" type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBookModal;
