import bookServices from "../lib/book/index.js";
import chapterServices from "../lib/chapter/index.js";
import sectionServices from "../lib/section/index.js";
import { ExportBookFormatTypes } from "../types/index.js";
import newError from "../utils/newError.js";
import successResponse from "../utils/successResponse.js";
import { createBookSchema, queryParamsSchema, updateBookSchema } from "../zodSchemas/bookSchemas.js";
import htmlToDocx from "html-to-docx";
import buildBookHTML from "../utils/build-book-html.js";
import { htmlToPdf } from "../utils/html-to-pdf.js";
// get all books
const getAllBook = async (req, res, next) => {
    try {
        const { include, page, limit } = queryParamsSchema.parse(req.query);
        const query = {};
        if (page) {
            query.page = page;
        }
        if (limit) {
            query.limit = limit;
        }
        if (include) {
            query.populate = include.split(",");
        }
        const allBooks = await bookServices.findAll(query);
        return successResponse({ res, data: allBooks, extra: { ...query, total: allBooks.length } });
    }
    catch (error) {
        next(error);
    }
};
// create a new book
const createBook = async (req, res, next) => {
    try {
        const { title } = createBookSchema.parse(req.body);
        const id = req.user?.id;
        if (!id)
            throw newError({ message: "User not found", statusCode: 404 });
        const newBook = await bookServices.createOne({ title, authorId: id });
        return successResponse({ res, statusCode: 201, data: newBook });
    }
    catch (error) {
        next(error);
    }
};
// get a single book with book id
const getSingleBook = async (req, res, next) => {
    try {
        // get userid
        const { bookId } = req.params;
        if (!bookId)
            throw newError({ message: "Book id is required", statusCode: 404 });
        const query = {
            filter: {
                _id: bookId,
            },
        };
        const { include } = queryParamsSchema.parse(req.query);
        if (include) {
            query.populate = include.split(",");
        }
        const book = await bookServices.findOne(query);
        // check user
        if (!book)
            throw newError({ message: "Book not found", statusCode: 404 });
        return successResponse({ res, data: book });
    }
    catch (error) {
        next(error);
    }
};
// delete a book
const deleteBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        if (!bookId)
            throw newError({ message: "Book id is required", statusCode: 404 });
        await bookServices.deleteOne(bookId);
        return successResponse({ res, message: "Book deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
// update a book informations
const updateBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        if (!bookId)
            throw newError({ message: "Book id is required", statusCode: 404 });
        const { title, cover, summary, status } = updateBookSchema.parse(req.body);
        const updateFields = {};
        if (title)
            updateFields.title = title;
        if (cover)
            updateFields.cover = cover;
        if (summary)
            updateFields.summary = summary;
        if (status)
            updateFields.status = status;
        if (Object.keys(updateFields).length === 0)
            throw newError({ message: "No fields to update", statusCode: 400 });
        await bookServices.updateOne({ id: bookId, update: updateFields });
        return successResponse({ res, message: "Book updatded successfully" });
    }
    catch (error) {
        next(error);
    }
};
// get all books of a user
const getBooksOfaUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!userId)
            throw newError({ message: "User id is required", statusCode: 404 });
        const query = {
            filter: {
                author: userId,
            },
        };
        const books = await bookServices.findAll(query);
        if (!books)
            throw newError({ message: "User not found" });
        return successResponse({ res, data: books });
    }
    catch (error) {
        next(error);
    }
};
const exportBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        if (!bookId)
            throw newError({ message: "Book id is required", statusCode: 404 });
        const { format } = req.query;
        if (!format)
            throw newError({ message: "Enter export format", statusCode: 404 });
        if (format !== ExportBookFormatTypes.PDF && format !== ExportBookFormatTypes.DOCX) {
            throw newError({ message: "Invalid format", statusCode: 404 });
        }
        const book = await bookServices.findOne({
            filter: { _id: bookId },
            select: { title: 1 },
        });
        if (!book)
            throw newError({ message: "Book not found", statusCode: 404 });
        const chapters = await chapterServices.findAll({
            filter: { book: bookId },
            select: { title: 1, position: 1 },
            sort: "ASC",
        });
        if (chapters.length == 0)
            throw newError({ message: "Minimum one chapter is required to export a book", statusCode: 404 });
        const sections = await sectionServices.findAll({
            filter: { chapter: { $in: chapters.map(c => c._id) } },
            select: { title: 1, position: 1, content: 1, chapter: 1 },
            sort: "ASC",
            limit: 'none',
        });
        if (sections.length == 0)
            throw newError({ message: "Minimum one section is required to export a book", statusCode: 404 });
        const exportChapters = chapters.map(ch => ({
            title: ch.title,
            position: ch.position,
            sections: sections
                .filter(sec => sec.chapter.toString() === ch._id.toString())
                .map(sec => ({
                title: sec.title,
                position: sec.position,
                content: sec.content,
            })),
        }));
        const structuredBook = {
            title: book.title,
            chapters: exportChapters,
        };
        const bookHtml = buildBookHTML(structuredBook);
        let fileBuffer;
        if (format === "docx") {
            fileBuffer = await htmlToDocx(bookHtml);
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        }
        // if(format === "pdf"){
        //   fileBuffer = await htmlToPdf(bookHtml);
        //   res.setHeader("Content-Type", "application/pdf");
        // }
        const fileName = `${book.title}.${format}`;
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
        return res.end(fileBuffer);
    }
    catch (error) {
        next(error);
    }
};
const bookControllers = {
    createBook,
    deleteBook,
    getAllBook,
    getSingleBook,
    updateBook,
    getBooksOfaUser,
    exportBook,
};
export default bookControllers;
//# sourceMappingURL=book.js.map