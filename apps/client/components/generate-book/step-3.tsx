
"use client";

import { StoreType } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Step3Props {
  setStep: (step: 2 | 4) => void;
}

function Step3({ setStep }: Step3Props) {
  const chapters = useStoreState<StoreType>((state) => state.generateBook.chapters);
  const sections = useStoreState<StoreType>((state) => state.generateBook.sections);
  const updateSection = useStoreActions<StoreType>((actions) => actions.generateBook.updateSection);

  const sectionsSchema = z.object({
    sections: z.array(
      z.array(
        z.object({
          title: z.string().min(1, { message: "Section title is required" }),
          position: z.number(),
        })
      )
    ),
  });

  const form = useForm<z.infer<typeof sectionsSchema>>({
    resolver: zodResolver(sectionsSchema),
    defaultValues: {
      sections: sections,
    },
  });

  function onSubmit(values: z.infer<typeof sectionsSchema>) {
    // Sync validated sections back to store (though they might be synced via onChange)
    // Here we ensure the store has the latest valid values before moving on
    values.sections.forEach((chapterSections, chapterIndex) => {
      chapterSections.forEach((section, sectionIndex) => {
        updateSection({ chapterIndex, sectionIndex, section: { title: section.title } });
      });
    });
    
    setStep(4);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Edit Sections</h2>
        <p className="text-sm text-muted-foreground mb-4">Review and edit the sections for each chapter.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="space-y-6">
            {chapters.map((chapter: { title: string; summary: string; position: number }, chapterIndex: number) => (
              <div key={chapterIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{chapter.title}</h3>
                  <span className="text-sm text-muted-foreground">({sections[chapterIndex]?.length || 0} sections)</span>
                </div>

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
            <Button type="submit">
              Next: Final Review
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Step3;
