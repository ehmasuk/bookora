import { Book } from "../../models/index.js";
import newError from "../../utils/newError.js";
const updateOne = async ({ id, update }) => {
    try {
        const book = await Book.findById(id);
        if (!book)
            throw newError({ message: "Book not found", statusCode: 404 });
        const updatedBook = await Book.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        return updatedBook;
    }
    catch (error) {
        throw error;
    }
};
export default updateOne;
//# sourceMappingURL=updateOne.js.map