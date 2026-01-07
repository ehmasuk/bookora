
"use client";

import usePost from "@/hooks/usePost";
import { StoreType } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Step3Props {
  setStep: (step: 1 | 2) => void;
}

function Step3({ setStep }: Step3Props) {
  const router = useRouter();
  const { postData, loading: creatingBook } = usePost();
  const [creatingChapters, setCreatingChapters] = useState(false);
  const [creatingSections, setCreatingSections] = useState(false);

  const chapters = useStoreState<StoreType>((state) => state.generateBook.chapters);
  const sections = useStoreState<StoreType>((state) => state.generateBook.sections);
  const reset = useStoreActions<StoreType>((actions) => actions.generateBook.reset);

  const bookFormSchema = z.object({
    title: z.string().min(1, { message: "Book title is required" }),
    sections: z.array(
      z.array(
        z.object({
          title: z.string().min(1, { message: "Section title is required" }),
          position: z.number(),
        })
      )
    ),
  });

  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      sections: sections,
    },
  });

  function onSubmit(values: z.infer<typeof bookFormSchema>) {
    // Step 1: Create book
    postData<{ code: number; message: string; data: { id: string } }>({
      url: "/book",
      data: { title: values.title },
      onSuccess: (bookResponse) => {
        if (!bookResponse?.data?.id) {
          toast.error("Failed to create book");
          return;
        }

        const bookId = bookResponse.data.id;
        toast.success("Book created successfully!");

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

            toast.success("Chapters created successfully!");
            setCreatingChapters(false);

            // Step 3: Create sections
            setCreatingSections(true);
            const sectionPromises: Array<Promise<void>> = [];

            // Use values.sections instead of global store sections
            values.sections.forEach((chapterSections, chIndex) => {
              if (chapterSections && chapterIds[chIndex]) {
                chapterSections.forEach((section, sectionIndex) => {
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
                });
              }
            });

            Promise.all(sectionPromises).then(() => {
              toast.success("Sections created successfully!");
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
        <h2 className="text-xl font-semibold mb-4">Review Sections & Create Book</h2>
        <p className="text-sm text-muted-foreground mb-4">Review sections for all chapters and provide a book title to create your book.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Book Title Form */}
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

          {/* Sections Display */}
          <div className="space-y-6">
            {chapters.map((chapter: { title: string; summary: string; position: number }, chapterIndex: number) => (
              <div key={chapterIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{chapter.title}</h3>
                  <span className="text-sm text-muted-foreground">({sections[chapterIndex]?.length || 0} sections)</span>
                </div>

                {/* We map over the sections in the form data for this chapter */}
                {/* Note: The outer loop iterates chapters from store, but we access sections from form state */}
                <div className="space-y-3">
                  {sections[chapterIndex]?.map((_: unknown, sectionIndex: number) => (
                    <FormField
                      key={sectionIndex}
                      control={form.control}
                      name={`sections.${chapterIndex}.${sectionIndex}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Section {sectionIndex + 1}</FormLabel>
                          <FormControl>
                            <Input placeholder="Section title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  {(!sections[chapterIndex] || sections[chapterIndex].length === 0) && (
                    <p className="text-sm text-muted-foreground">No sections generated for this chapter.</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button type="submit" loading={creatingBook || creatingChapters || creatingSections}>
              Create Book
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Step3;
