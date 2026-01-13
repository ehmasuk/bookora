import z from "zod";
import generateChapters, {} from "../utils/generateChapters.js";
import generateSections from "../utils/generateSections.js";
import newError from "../utils/newError.js";
import successResponse from "../utils/successResponse.js";
import { generateBookChaptersSchema } from "../zodSchemas/bookSchemas.js";
const generateChapter = async (req, res, next) => {
    try {
        const { prompt, category, genre, tone, targetAudience } = generateBookChaptersSchema.parse(req.body);
        const payload = {
            prompt,
            category,
            genre,
            tone,
            targetAudience,
        };
        const generatedChapters = await generateChapters(payload, 5);
        return successResponse({
            res,
            statusCode: 201,
            message: "Chapters generated successfully",
            data: generatedChapters,
        });
    }
    catch (error) {
        next(error);
    }
};
const generateSection = async (req, res, next) => {
    try {
        const chaptersSchema = z.array(z.object({
            title: z.string(),
            summary: z.string(),
            position: z.number(),
        }));
        const chapters = chaptersSchema.parse(req.body);
        if (chapters.length === 0) {
            throw newError({
                message: "Chapters array cannot be empty",
                statusCode: 400,
            });
        }
        const generatedSections = await generateSections(chapters, 3);
        return successResponse({
            res,
            statusCode: 201,
            message: "Sections generated successfully",
            data: generatedSections,
        });
    }
    catch (error) {
        next(error);
    }
};
const generateControllers = {
    generateChapter,
    generateSection,
};
export default generateControllers;
//# sourceMappingURL=generate.js.map