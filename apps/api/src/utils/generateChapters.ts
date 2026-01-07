import { ChatGroq } from "@langchain/groq";
import { z } from "zod";

import env from "../config/env.js";

export type DraftPayloadTypes = {
  prompt: string;
  category: string;
  genre: string;
  tone: string;
  targetAudience: string;
};

export type GeneratedChapter = {
  title: string;
  summary: string;
  position: number;
};

const generateChapters = async (payload: DraftPayloadTypes, count: number): Promise<GeneratedChapter[]> => {
  const ChaptersSchema = z.object({
    chapters: z
      .array(
        z.object({
          title: z.string().describe("Chapter title"),
          summary: z.string().describe("Short paragraph summarizing the chapter"),
          position: z.number().describe("1-based index of the chapter in the book"),
        })
      )
      .length(count)
      .describe(`Exactly ${count} chapters for the book outline`),
  });

  const model = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    apiKey: env.GROQ_API_KEY,
    temperature: 0.8,
    maxTokens: 4096,
    maxRetries: 2,
  });

  const structuredModel = model.withStructuredOutput(ChaptersSchema);
  const promptText = [
    "You are an expert book outline creator.",
    `Create an outline of exactly ${count} chapters for a book with the following details:`,
    `Prompt: ${payload.prompt}`,
    `Category: ${payload.category}`,
    `Genre: ${payload.genre}`,
    `Tone: ${payload.tone}`,
    `Target audience: ${payload.targetAudience}`,
    "",
    "Return the chapters as a JSON object with a 'chapters' array containing all chapters.",
  ].join("\n");

  const result = await structuredModel.invoke(promptText);

  const chapters: GeneratedChapter[] = result.chapters.map((c: any, index: number) => ({
    title: String(c.title ?? `Chapter ${index + 1}`),
    summary: String(c.summary ?? ""),
    position: typeof c.position === "number" ? c.position : index + 1,
  }));

  return chapters;
};

export default generateChapters;
