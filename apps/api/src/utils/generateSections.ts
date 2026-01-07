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
  const OutputSchema = z.object({
    chapters: z
      .array(
        z.object({
          sections: z
            .array(
              z.object({
                title: z.string().describe("Section title"),
                position: z.number().describe("1-based position within the chapter"),
              })
            )
            .length(count)
            .describe(`Exactly ${count} sections for this chapter`),
        })
      )
      .length(chapters.length)
      .describe(`One entry per chapter`),
  });

  const model = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    apiKey: env.GROQ_API_KEY,
    temperature: 0.8,
    maxTokens: 4096,
    maxRetries: 2,
  });

  const structuredModel = model.withStructuredOutput(OutputSchema);

  const chaptersString: string = JSON.stringify(chapters);

  const promptText = [
    "You are an expert book content creator.",
    `Create exactly ${count} section titles for each of the following ${chapters.length} chapters:`,
    "",
    chaptersString,
    "",
    `For each chapter, generate exactly ${count} section titles according to chapter context.`,
    `Return the output as a JSON object with a 'chapters' array.`,
    `The 'chapters' array should contain ${chapters.length} objects (one per chapter), and each object must have a 'sections' array.`,
    `Each 'sections' array must contain exactly ${count} section objects with 'title' and 'position' properties.`,
  ].join("\n");

  const result = await structuredModel.invoke(promptText);

  const sections: GeneratedSection[][] = result.chapters.map((chapter) =>
    chapter.sections.map((s, index) => ({
      title: String(s.title ?? `Section ${index + 1}`),
      position: typeof s.position === "number" ? s.position : index + 1,
    }))
  );

  return sections;
};

export default generateSections;
