import { isValidObjectId } from "mongoose";
import z from "zod";
import chapterServices from "../lib/chapter/index.js";
import newError from "../utils/newError.js";
import successResponse from "../utils/successResponse.js";
import { queryParamsSchema } from "../zodSchemas/bookSchemas.js";
import { updateChapterSchema } from "../zodSchemas/chapterSchemas.js";
// get all chapters of a book
const getChaptersOfaBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        if (!bookId)
            throw newError({ message: "Chapter id is required" });
        const { include } = queryParamsSchema.parse(req.query);
        const query = {
            filter: {
                book: bookId,
            },
        };
        if (include) {
            query.populate = include.split(",");
        }
        const chapters = await chapterServices.findAll(query);
        if (!chapters)
            throw newError({ message: "Chapter not found", statusCode: 404 });
        return successResponse({ res, data: chapters });
    }
    catch (error) {
        next(error);
    }
};
// create a new chapter
const createChapter = async (req, res, next) => {
    try {
        const reqParamSchema = z.object({
            title: z.string().min(3).max(200),
            bookId: z.string().min(1),
        });
        const { title, bookId } = reqParamSchema.parse(req.body);
        const chapter = await chapterServices.createOne({ title, bookId });
        return successResponse({ res, data: chapter });
    }
    catch (error) {
        next(error);
    }
};
// get a single chapter
const getSingleChapter = async (req, res, next) => {
    try {
        const { chapterId } = req.params;
        if (!chapterId)
            throw newError({ message: "Chapter id is required" });
        const query = {
            filter: {
                _id: chapterId,
            },
        };
        const { include } = queryParamsSchema.parse(req.query);
        if (include) {
            query.populate = include.split(",");
        }
        const chapter = await chapterServices.findOne(query);
        if (!chapter)
            throw newError({ message: "Chapter not found", statusCode: 404 });
        return successResponse({ res, data: chapter });
    }
    catch (error) {
        next(error);
    }
};
// delete a single chapter
const deleteChapter = async (req, res, next) => {
    try {
        const { chapterId } = req.params;
        if (!chapterId || !isValidObjectId(chapterId)) {
            throw newError({ message: "Invalid id" });
        }
        await chapterServices.deleteOne(chapterId);
        return successResponse({ res, message: "Chapter deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
// update a single chapter
const updateChapter = async (req, res, next) => {
    try {
        const { chapterId } = req.params;
        if (!chapterId || !isValidObjectId(chapterId)) {
            throw newError({ message: "Invalid id" });
        }
        const { title, summary, position } = updateChapterSchema.parse(req.body);
        const update = {
            title,
            summary,
            position,
        };
        const updated = await chapterServices.updateOne({ id: chapterId, update });
        return successResponse({ res, message: "Chapter updated successfully", data: updated });
    }
    catch (error) {
        next(error);
    }
};
const chapterControllers = {
    createChapter,
    deleteChapter,
    getChaptersOfaBook,
    getSingleChapter,
    updateChapter,
};
export default chapterControllers;
//# sourceMappingURL=chapter.js.map