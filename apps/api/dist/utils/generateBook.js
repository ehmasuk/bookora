import { ChatGroq } from "@langchain/groq";
import { z } from "zod";
import env from "../config/env.js";
export const DEFAULT_SECTIONS_PER_CHAPTER = 3;
const generateBookWithGemini = async (payload, chaptersCount = 5, sectionsPerChapter = DEFAULT_SECTIONS_PER_CHAPTER) => {
    const BookSchema = z.object({
        chapters: z
            .array(z.object({
            title: z.string().describe("Chapter title"),
            summary: z
                .string()
                .describe("Short paragraph summarizing the chapter"),
            position: z
                .number()
                .describe("1-based index of the chapter in the book"),
            sections: z
                .array(z.object({
                title: z.string().describe("Section title"),
                position: z
                    .number()
                    .optional()
                    .describe("0-based position within the chapter"),
            }))
                .length(sectionsPerChapter)
                .describe(`Exactly ${sectionsPerChapter} sections for this chapter`),
        }))
            .length(chaptersCount)
            .describe(`Exactly ${chaptersCount} chapters for the book outline with sections`),
    });
    const model = new ChatGroq({
        model: "llama-3.3-70b-versatile",
        apiKey: env.GROQ_API_KEY,
        temperature: 0.8,
        maxTokens: 4096,
        maxRetries: 2,
    });
    const structuredModel = model.withStructuredOutput(BookSchema);
    const promptText = [
        "You are an expert book outline creator.",
        `Create an outline of exactly ${chaptersCount} chapters. Each chapter must have exactly ${sectionsPerChapter} section titles (no content).`,
        `Prompt: ${payload.prompt}`,
        `Category: ${payload.category}`,
        `Genre: ${payload.genre}`,
        `Tone: ${payload.tone}`,
        `Target audience: ${payload.targetAudience}`,
        "Return only the structured data.",
    ].join("\n");
    const result = await structuredModel.invoke(promptText);
    const chapters = result.chapters.map((c, cIndex) => {
        const sections = Array.isArray(c.sections) ? c.sections : [];
        return {
            title: String(c.title ?? `Chapter ${cIndex + 1}`),
            summary: String(c.summary ?? ""),
            position: typeof c.position === "number" ? c.position : cIndex + 1,
            sections: sections.map((s, sIndex) => ({
                title: String(s.title ?? `Section ${sIndex + 1}`),
                position: typeof s.position === "number" ? s.position : sIndex,
            })),
        };
    });
    return chapters;
};
export default generateBookWithGemini;
//# sourceMappingURL=generateBook.js.map