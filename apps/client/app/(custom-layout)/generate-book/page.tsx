"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { useForm } from "react-hook-form";

const categoryOptions = [
  { value: "fiction", label: "Fiction" },
  { value: "non-fiction", label: "Non-Fiction" },
  { value: "educational", label: "Educational" },
  { value: "self-help", label: "Self-Help" },
  { value: "mystery", label: "Mystery" },
];

const genreOptions = [
  { value: "sci-fi", label: "Science Fiction" },
  { value: "fantasy", label: "Fantasy" },
  { value: "romance", label: "Romance" },
  { value: "thriller", label: "Thriller" },
  { value: "biography", label: "Biography" },
  { value: "self-help", label: "Self-Help" },
];

const targetAudienceOptions = [
  { value: "children", label: "Children" },
  { value: "teens", label: "Teens" },
  { value: "adults", label: "Adults" },
  { value: "professionals", label: "Professionals" },
  { value: "general", label: "General Audience" },
];

const toneOptions = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "serious", label: "Serious" },
  { value: "inspirational", label: "Inspirational" },
];

function page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <InitialForm />
    </div>
  );
}

const InitialForm = () => {
  const formSchema = z.object({
    prompt: z.string().min(10, { message: "prompt is required" }),
    category: z.string().min(1, { message: "category is required" }),
    genre: z.string().min(1, { message: "genre is required" }),
    targetAudience: z.string().min(1, { message: "targetAudience is required" }),
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
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p className="font-medium text-lg">Prompt</p>
              </FormLabel>
              <FormDescription>This is your public display name.</FormDescription>
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid sm:grid-cols-2 sm:gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <p className="font-medium text-lg">Category</p>
                </FormLabel>
                <FormControl>
                  <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" className="w-full" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
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
                  <p className="font-medium text-lg">Genre</p>
                </FormLabel>
                <FormControl>
                  <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" className="w-full" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Genere</SelectLabel>
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
                <FormControl>
                  <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" className="w-full" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Target Audience</SelectLabel>
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
                  <p className="font-medium text-lg">Tone</p>
                </FormLabel>
                <FormControl>
                  <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" className="w-full" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tone</SelectLabel>
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

        <div className="flex justify-end">
          <Button type="submit">Generate Chapters</Button>
        </div>
      </form>
    </Form>
  );
};

export default page;
