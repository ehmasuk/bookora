import { ChatGroq } from "@langchain/groq";
import { z } from "zod";
import env from "../config/env.js";
const generateSectionTitlesWithGemini = async (chapters, count = 3) => {
    const SectionsSchema = z.object({
        sections: z
            .array(z.object({
            parentChapterId: z.number().describe("The position of parent chapter this section belongs to (e.g., 1 for Chapter 1)"),
            title: z.string().describe("Section title"),
            position: z.number().describe("1-based index of the section within the chapter"),
        }))
            .describe(`Generate exactly ${count} section titles for each of the ${chapters.length} chapters provided`),
    });
    const model = new ChatGroq({
        model: "llama-3.3-70b-versatile",
        apiKey: env.GROQ_API_KEY,
        temperature: 0.8,
        maxTokens: 4096,
        maxRetries: 2,
    });
    const structuredModel = model.withStructuredOutput(SectionsSchema);
    const chaptersString = JSON.stringify(chapters.map(c => ({ position: c.position, title: c.title, summary: c.summary })));
    const promptText = [
        "You are an expert book content creator.",
        `Create exactly ${count} interesting section titles for each of the following ${chapters.length} chapters.`,
        "Do NOT generate content, ONLY titles.",
        "",
        "Chapters:",
        chaptersString,
        "",
        `Output exactly ${count} sections for EACH chapter.`,
    ].join("\n");
    // console.log(promptText);
    const result = await structuredModel.invoke(promptText);
    const sections = result.sections.map((s, index) => ({
        chapter: String(s.parentChapterId), // This will correspond to chapter position
        title: String(s.title),
        position: typeof s.position === "number" ? s.position : (index % count) + 1,
    }));
    return sections;
};
export default generateSectionTitlesWithGemini;
//# sourceMappingURL=generateSectionTitles.js.map