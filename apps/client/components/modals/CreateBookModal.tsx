"use client";

import usePost from "@/hooks/usePost";
import { BookType } from "@/types/book";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { ArrowRightIcon, BookMarkedIcon, SparklesIcon } from "lucide-react";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import React from "react";

import { Separator } from "@workspace/ui/components/separator";

import { IconPencilStar, IconWand } from "@tabler/icons-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

interface NewBookResponse {
  code: number;
  message: string;
  data: BookType;
}

function CreateBookModal({ children }: Props) {
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
        if (res?.data) {
          toast.success("Book created successfully");
          const { id: newBookId } = res.data;
          router.push(`/book/${newBookId}`);
          setIsOpen(false);
        }
      },
      onError: (errMessage) => {
        toast.error(errMessage);
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>

      <DialogContent className="overflow-visible p-0 sm:max-w-2xl gap-0">
        <DialogHeader className="border-b px-6 py-4 mb-0">
          <DialogTitle>Create New Book</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col-reverse md:flex-row">
          {/* left col */}
          <div className="flex flex-1 flex-col justify-between md:w-80 md:border-r">
            <div className="flex-1 grow">
              <div className="border-t p-6 md:border-none">
                <div className="flex items-center space-x-3">
                  <div className="inline-flex shrink-0 items-center justify-center rounded-sm bg-muted p-3">
                    <IconPencilStar className="size-5 text-foreground" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium text-foreground">
                      Create Manually
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Start with a blank book
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <h4 className="text-sm font-medium text-foreground">
                  How it works?
                </h4>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Enter a title and build your book from scratch with full
                  control.
                </p>
              </div>
            </div>
            <div className="border-t p-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputGroup className="h-10">
                            <InputGroupInput
                              placeholder="Book name"
                              type="text"
                              {...field}
                            />
                            <InputGroupAddon>
                              <BookMarkedIcon />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                              <Button
                                loading={loading}
                                variant="black"
                                type="submit"
                                className="size-8 p-0"
                              >
                                <ArrowRightIcon />
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>

          {/* right col */}
          <div className="flex flex-col justify-between md:w-80">
            <div className="flex-1 grow">
              <div className="border-t p-6 md:border-none">
                <div className="flex items-center space-x-3">
                  <div className="inline-flex shrink-0 items-center justify-center rounded-sm bg-muted p-3">
                    <IconWand className="size-5 text-foreground" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium text-foreground">
                      Generate with AI
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Let AI build your book structure
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <h4 className="text-sm font-medium text-foreground">
                  How it works?
                </h4>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Quickly generate a complete book structure with chapters and
                  sections.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end border-t p-5">
              <Link href="/generate-book">
                <Button type="submit" variant="black" className="h-8">
                  <SparklesIcon />
                  Generate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBookModal;
