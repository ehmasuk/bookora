import Book from "../../models/book.js";
import newError from "../../utils/newError.js";
import userServices from "../user/index.js";
const createOne = async ({ title, authorId }) => {
    try {
        const user = await userServices.findOne({ filter: { _id: authorId } });
        if (!user) {
            throw newError({ message: "User not found", statusCode: 404 });
        }
        const newBook = new Book({
            title,
            author: authorId,
        });
        return await newBook.save();
    }
    catch (error) {
        throw error;
    }
};
export default createOne;
//# sourceMappingURL=createOne.js.map