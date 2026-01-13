import type { NextFunction, RequestHandler, Response } from "express";
import { isValidObjectId } from "mongoose";
import z from "zod";
import sectionServices from "../lib/section/index.js";
import newError from "../utils/newError.js";
import successResponse from "../utils/successResponse.js";
import { queryParamsSchema } from "../zodSchemas/bookSchemas.js";
import { updateSectionSchema } from "../zodSchemas/sectionSchemas.js";
import type { CustomRequest } from "../types/index.js";

// create a new Section
const createSection = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqParamSchema = z.object({
      title: z.string().min(3).max(200),
      chapterId: z.string().min(1),
    });

    const { title, chapterId } = reqParamSchema.parse(req.body);

    const chapter = await sectionServices.createOne({ title, chapterId });

    return successResponse({ res, data: chapter });
  } catch (error) {
    next(error);
  }
};

// get a single Section
const getSingleSection = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sectionId } = req.params;
    if (!sectionId || !isValidObjectId(sectionId))
      throw newError({ message: "Invalid id" });

    const query: { filter: object; populate?: string[] } = {
      filter: {
        _id: sectionId,
      },
    };

    const { include } = queryParamsSchema.parse(req.query);

    if (include) {
      query.populate = include.split(",");
    }

    const section = await sectionServices.findOne(query);
    if (!section)
      throw newError({ message: "Chapter not found", statusCode: 404 });

    return successResponse({ res, data: section });
  } catch (error) {
    next(error);
  }
};

// delete a single Section
const deleteSection = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sectionId } = req.params;
    if (!sectionId || !isValidObjectId(sectionId)) {
      throw newError({ message: "Invalid id" });
    }
    await sectionServices.deleteOne(sectionId);
    return successResponse({ res, message: "Section deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// update a single Section
const updateSection = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sectionId } = req.params;
    if (!sectionId || !isValidObjectId(sectionId)) {
      throw newError({ message: "Invalid id" });
    }

    const { title, content, position } = updateSectionSchema.parse(req.body);

    const update = {
      title,
      content,
      position,
    };

    const updated = await sectionServices.updateOne({ id: sectionId, update });

    return successResponse({
      res,
      message: "Section updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// get sections of a chapter
const getSectionsOfaChapter = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { chapterId } = req.params;
    if (!chapterId) throw newError({ message: "Chapter id is required" });

    const { include } = queryParamsSchema.parse(req.query);

    const query: { populate?: string[]; filter: object } = {
      filter: {
        chapter: chapterId,
      },
    };

    if (include) {
      query.populate = include.split(",");
    }

    const chapters = await sectionServices.findAll(query);
    if (!chapters)
      throw newError({ message: "Chapter not found", statusCode: 404 });

    return successResponse({ res, data: chapters });
  } catch (error) {
    next(error);
  }
};

export type SectionControllersType = {
  createSection: RequestHandler;
  deleteSection: RequestHandler;
  getSectionsOfaChapter: RequestHandler;
  getSingleSection: RequestHandler;
  updateSection: RequestHandler;
};

const sectionControllers: SectionControllersType = {
  createSection,
  deleteSection,
  getSectionsOfaChapter,
  getSingleSection,
  updateSection,
};

export default sectionControllers;
