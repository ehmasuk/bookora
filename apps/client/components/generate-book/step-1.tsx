"use client";

import { z } from "zod";

import axiosInstance from "@/lib/axiosInstance";
import { StoreType } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Sparkle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Step1Props {
  setStep: (step: 2) => void;
}

import Logo from "../global/Logo";
import GeneratingChaptersSkeleton from "../skeletons/generating-book";
import {
  categoryOptions,
  genreOptions,
  targetAudienceOptions,
  toneOptions,
} from "@/data/generate-book-options";

function Step1({ setStep }: Step1Props) {
  const [loading, setLoading] = useState(false);
  const formData = useStoreState<StoreType>(
    (state) => state.generateBook.formData,
  );
  const chapters = useStoreState<StoreType>(
    (state) => state.generateBook.chapters,
  );
  const setFormData = useStoreActions<StoreType>(
    (actions) => actions.generateBook.setFormData,
  );
  const setChapters = useStoreActions<StoreType>(
    (actions) => actions.generateBook.setChapters,
  );
  const setSections = useStoreActions<StoreType>(
    (actions) => actions.generateBook.setSections,
  );

  const formSchema = z.object({
    prompt: z.string().min(10, { message: "prompt is required" }),
    category: z.string().min(1, { message: "category is required" }),
    genre: z.string().min(1, { message: "genre is required" }),
    targetAudience: z
      .string()
      .min(1, { message: "targetAudience is required" }),
    tone: z.string().min(1, { message: "tone is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      category: "",
      genre: "",
      targetAudience: "",
      tone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Check if data has changed
      const isDataChanged = JSON.stringify(values) !== JSON.stringify(formData);

      if (!isDataChanged && chapters.length > 0) {
        setStep(2);
        return;
      }

      setLoading(true);
      setFormData(values);
      // Clear sections if we are regenerating chapters
      setSections([]);

      const response = await axiosInstance.post("/generate/chapter", values);
      const newChapters = response.data?.data || [];

      if (newChapters.length === 0) {
        toast.error("No chapters generated. Please try again.");
        return;
      }

      setChapters(newChapters);
      setStep(2);
    } catch (error: unknown) {
      let errorMessage = "Failed to generate chapters";
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
    <div>
      <div className="-mt-16.5">
        <Logo />
      </div>
      <div>
        <h1 className="mt-8 max-w-2xl text-balance text-5xl font-bold lg:text-6xl">
          Write Your Book 10x Faster
        </h1>
        <p className="text-foreground my-6 max-w-2xl text-balance text-2xl">
          Craft. Outline. Generate your next masterpiece with AI support.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <p className="font-medium text-lg">
                    Book Concept or Plot Summary
                  </p>
                </FormLabel>
                <FormDescription>
                  Describe your book&apos;s core idea, key characters, and setting.
                  The more specific you are, the better the generated chapters
                  will be.
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Write a story about a young character who faces a big challenge.The story should include a clear beginning, middle, and ending. Describe the setting, emotions, and how the character changes by the end...."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <p className="font-medium text-lg">Book Category</p>
                  </FormLabel>
                  <FormControl className="w-full">
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <p className="font-medium text-lg">Literary Genre</p>
                  </FormLabel>
                  <FormControl className="w-full">
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectLabel>Genres</SelectLabel>
                          {genreOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <p className="font-medium text-lg">Target Audience</p>
                  </FormLabel>
                  <FormControl className="w-full">
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Who is this for?" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectLabel>Audiences</SelectLabel>
                          {targetAudienceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <p className="font-medium text-lg">Writing Tone & Style</p>
                  </FormLabel>
                  <FormControl className="w-full">
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a tone" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectLabel>Tones</SelectLabel>
                          {toneOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="px-8">
              <Sparkle />
              Generate chapters
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Step1;
