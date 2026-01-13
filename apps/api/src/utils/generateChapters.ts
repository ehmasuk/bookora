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

import newError from "./newError.js";

const generateChapters = async (
  payload: DraftPayloadTypes,
  count: number,
): Promise<GeneratedChapter[]> => {
  try {
    const ChaptersSchema = z.object({
      chapters: z
        .array(
          z.object({
            title: z.string().describe("Chapter title"),
            summary: z
              .string()
              .describe("Short paragraph summarizing the chapter"),
            position: z
              .number()
              .describe("1-based index of the chapter in the book"),
          }),
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

    const chapters: GeneratedChapter[] = result.chapters.map(
      (c: any, index: number) => ({
        title: String(c.title ?? `Chapter ${index + 1}`),
        summary: String(c.summary ?? ""),
        position: typeof c.position === "number" ? c.position : index + 1,
      }),
    );

    return chapters;
  } catch (error: any) {
    console.error("Error generating chapters:", error);

    // Handle Groq/LangChain specific errors
    if (error?.message?.includes("429") || error?.status === 429) {
      throw newError({
        message: "AI Service Rate Limit Exceeded. Please try again later.",
        statusCode: 429,
      });
    }

    if (error?.message?.includes("503") || error?.status === 503) {
      throw newError({
        message: "AI Service Unavailable. Please try again later.",
        statusCode: 503,
      });
    }

    throw newError({ message: "Failed to generate chapters", statusCode: 500 });
  }
};

export default generateChapters;
