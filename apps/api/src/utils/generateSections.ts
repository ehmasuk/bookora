import { ChatGroq } from "@langchain/groq";
import { z } from "zod";

import env from "../config/env.js";

export type ChapterInput = {
  title: string;
  summary: string;
  position: number;
};

export type GeneratedSection = {
  title: string;
  position: number;
};

const generateSections = async (chapters: ChapterInput[], count: number): Promise<GeneratedSection[][]> => {
  const SectionsSchema = z.object({
    sections: z
      .array(
        z
          .array(
            z.object({
              title: z.string().describe("Section title"),
              position: z.number().describe("1-based position within the chapter"),
            })
          )
          .length(count)
          .describe(`Exactly ${count} sections for one chapter`)
      )
      .length(chapters.length)
      .describe(`One array per chapter`),
  });

  const model = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    apiKey: env.GROQ_API_KEY,
    temperature: 0.8,
    maxTokens: 4096,
    maxRetries: 2,
  });

  const structuredModel = model.withStructuredOutput(SectionsSchema);

  const chaptersString: string = JSON.stringify(chapters);

  const promptText = [
    "You are an expert book content creator.",
    `Create exactly ${count} section titles for each of the following ${chapters.length} chapters:`,
    "",
    chaptersString,
    "",
    `For each chapter, generate exactly ${count} section titles according to chapter context.`,
    `Return the sections as a JSON object with a 'sections' array. The 'sections' array should contain ${chapters.length} sub-arrays, one for each chapter.`,
    `Each sub-array should contain exactly ${count} section objects with 'title' and 'position' properties.`,
    `The sections should be ordered by chapter (first sub-array for chapter 1, second for chapter 2, etc.).`,
  ].join("\n");

  const result = await structuredModel.invoke(promptText);

  const sections: GeneratedSection[][] = result.sections.map((chapterSections: any[]) =>
    chapterSections.map((s: any, index: number) => ({
      title: String(s.title ?? `Section ${index + 1}`),
      position: typeof s.position === "number" ? s.position : index + 1,
    }))
  );

  return sections;
};

export default generateSections;
