"use client";

import axiosInstance from "@/lib/axiosInstance";
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
import { Textarea } from "@workspace/ui/components/textarea";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Sparkle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import GeneratingChaptersSkeleton from "../skeletons/generating-book";

interface Step2Props {
  setStep: (step: 1 | 3) => void;
}

export default function Step2({ setStep }: Step2Props) {
  const [loading, setLoading] = useState(false);
  const chapters = useStoreState<StoreType>(
    (state) => state.generateBook.chapters,
  );
  const sections = useStoreState<StoreType>(
    (state) => state.generateBook.sections,
  );
  const updateChapter = useStoreActions<StoreType>(
    (actions) => actions.generateBook.updateChapter,
  );
  const setSections = useStoreActions<StoreType>(
    (actions) => actions.generateBook.setSections,
  );

  const formSchema = z.object({
    chapters: z.array(
      z.object({
        title: z.string().min(1, { message: "Chapter title is required" }),
        summary: z.string().min(1, { message: "Chapter summary is required" }),
        position: z.number(),
      }),
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chapters: chapters.map(
        (ch: { title: string; summary: string; position: number }) => ({
          title: ch.title,
          summary: ch.summary,
          position: ch.position,
        }),
      ),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Check if data has changed compared to store
      // We rely on JSON.stringify for deep comparison of the arrays of objects
      const isDataChanged =
        JSON.stringify(values.chapters) !== JSON.stringify(chapters);

      if (!isDataChanged && sections.length > 0) {
        setStep(3);
        return;
      }

      setLoading(true);

      // Sync form values back to store
      values.chapters.forEach((chapter, index) => {
        updateChapter({ index, chapter });
      });

      const response = await axiosInstance.post(
        "/generate/section",
        values.chapters,
      );
      const sectionsData = response.data?.data || [];

      setSections(sectionsData);
      setStep(3);
    } catch (error: unknown) {
      let errorMessage = "Failed to generate sections";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <GeneratingChaptersSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Edit Chapters</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Review and edit the generated chapters before generating sections.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            {form.getValues("chapters").map((_, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Chapter {index + 1}
                  </span>
                </div>

                <FormField
                  control={form.control}
                  name={`chapters.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Chapter title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`chapters.${index}.summary`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Chapter summary"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit">
              <Sparkle />
              Generate Sections
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
