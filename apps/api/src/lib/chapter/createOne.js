import { Chapter } from "../../models/index.js";
import newError from "../../utils/newError.js";
import bookServices from "../book/index.js";
const createOne = async ({ title, bookId }) => {
    try {
        // book is available or not
        const book = await bookServices.findOne({ filter: { _id: bookId } });
        if (!book) {
            throw newError({ message: "Book not found", statusCode: 404 });
        }
        // get the last chapter's position for this book
        const lastChapter = await Chapter.findOne({ book: bookId }).sort({ position: -1 }).select("position").lean();
        // assign next position safely
        const nextPosition = lastChapter ? lastChapter.position + 1 : 0;
        // create new chapter
        const newChapter = new Chapter({
            title,
            book: bookId,
            position: nextPosition,
        });
        return await newChapter.save();
    }
    catch (error) {
        throw error;
    }
};
export default createOne;
//# sourceMappingURL=createOne.js.map