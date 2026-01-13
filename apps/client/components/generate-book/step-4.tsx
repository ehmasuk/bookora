"use client";

import usePost from "@/hooks/usePost";
import { StoreType } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";



function Step4() {
  const router = useRouter();
  const { postData, loading: creatingBook } = usePost();
  const [creatingChapters, setCreatingChapters] = useState(false);
  const [creatingSections, setCreatingSections] = useState(false);

  const chapters = useStoreState<StoreType>(
    (state) => state.generateBook.chapters,
  );
  const sections = useStoreState<StoreType>(
    (state) => state.generateBook.sections,
  );
  const reset = useStoreActions<StoreType>(
    (actions) => actions.generateBook.reset,
  );

  const bookFormSchema = z.object({
    title: z.string().min(1, { message: "Book title is required" }),
  });

  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const formData = useStoreState<StoreType>(
    (state) => state.generateBook.formData,
  );

  function handleCreateBook(values: z.infer<typeof bookFormSchema>) {
    // Step 1: Create book
    postData<{ code: number; message: string; data: { id: string } }>({
      url: "/book",
      data: {
        title: values.title,
        summary: formData.prompt, // Use prompt as book summary
      },
      onSuccess: (bookResponse) => {
        if (!bookResponse?.data?.id) {
          toast.error("Failed to create book");
          return;
        }

        const bookId = bookResponse.data.id;

        // Step 2: Create chapters sequentially to maintain order
        setCreatingChapters(true);
        const chapterIds: string[] = [];
        let chapterIndex = 0;

        const createNextChapter = () => {
          if (chapterIndex >= chapters.length) {
            if (chapterIds.length !== chapters.length) {
              toast.error("Some chapters failed to create");
              setCreatingChapters(false);
              return;
            }

            setCreatingChapters(false);

            // Step 3: Create sections
            setCreatingSections(true);
            const sectionPromises: Array<Promise<void>> = [];

            // Iterate over global store sections since they are now final
            sections.forEach(
              (
                chapterSections: Array<{ title: string; position: number }>,
                chIndex: number,
              ) => {
                if (chapterSections && chapterIds[chIndex]) {
                  chapterSections.forEach(
                    (
                      section: { title: string; position: number },
                      sectionIndex: number,
                    ) => {
                      const promise = new Promise<void>((resolve) => {
                        postData({
                          url: "/section",
                          data: {
                            title: section.title,
                            chapterId: chapterIds[chIndex],
                            position: sectionIndex,
                          },
                          onSuccess: () => resolve(),
                          onError: () => resolve(), // Continue even if one fails
                        });
                      });
                      sectionPromises.push(promise);
                    },
                  );
                }
              },
            );

            Promise.all(sectionPromises).then(() => {
              setCreatingSections(false);

              // Reset store and navigate
              reset();
              router.push(`/book/${bookId}`);
            });
            return;
          }

          const chapter = chapters[chapterIndex];
          const currentIndex = chapterIndex;
          chapterIndex++;

          postData<{ code: number; message: string; data: { id: string } }>({
            url: "/chapter",
            data: {
              title: chapter.title,
              bookId: bookId,
              summary: chapter.summary,
              position: currentIndex,
            },
            onSuccess: (chapterResponse) => {
              if (chapterResponse?.data?.id) {
                chapterIds[currentIndex] = chapterResponse.data.id;
              }
              createNextChapter();
            },
            onError: () => {
              createNextChapter(); // Continue even if one fails
            },
          });
        };

        createNextChapter();
      },
      onError: (errMessage) => {
        toast.error(errMessage || "Failed to create book");
      },
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Final Review & Create</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Review all content and provide a title for your new book.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateBook)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter book title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-6">
            {chapters.map(
              (
                chapter: { title: string; summary: string; position: number },
                chapterIndex: number,
              ) => (
                <div
                  key={chapterIndex}
                  className="border rounded-lg p-4 space-y-4 bg-muted/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{chapter.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      ({sections[chapterIndex]?.length || 0} sections)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {chapter.summary}
                  </p>

                  {sections[chapterIndex] &&
                    sections[chapterIndex].length > 0 && (
                      <div className="pl-4 border-l-2 border-muted space-y-1">
                        {sections[chapterIndex].map(
                          (
                            section: { title: string },
                            sectionIndex: number,
                          ) => (
                            <p key={sectionIndex} className="text-sm">
                              {sectionIndex + 1}. {section.title}
                            </p>
                          ),
                        )}
                      </div>
                    )}
                </div>
              ),
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              loading={creatingBook || creatingChapters || creatingSections}
            >
              Create Book
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Step4;
