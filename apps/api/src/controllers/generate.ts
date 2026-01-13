import type { NextFunction, RequestHandler, Response } from "express";
import z from "zod";

import type { CustomRequest } from "../types/index.js";
import generateChapters, {
  type DraftPayloadTypes,
} from "../utils/generateChapters.js";
import generateSections from "../utils/generateSections.js";
import newError from "../utils/newError.js";
import successResponse from "../utils/successResponse.js";
import { generateBookChaptersSchema } from "../zodSchemas/bookSchemas.js";

const generateChapter: RequestHandler = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { prompt, category, genre, tone, targetAudience } =
      generateBookChaptersSchema.parse(req.body);

    const payload: DraftPayloadTypes = {
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
  } catch (error) {
    next(error);
  }
};

const generateSection: RequestHandler = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chaptersSchema = z.array(
      z.object({
        title: z.string(),
        summary: z.string(),
        position: z.number(),
      }),
    );

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
  } catch (error) {
    next(error);
  }
};

const generateControllers: {
  generateChapter: RequestHandler;
  generateSection: RequestHandler;
} = {
  generateChapter,
  generateSection,
};

export default generateControllers;
