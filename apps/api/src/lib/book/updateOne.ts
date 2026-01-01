import { Book } from "../../models/index.js";
import newError from "../../utils/newError.js";

export interface Props {
  id: string;
  update: object;
}

const updateOne = async ({ id, update }: Props) => {
  try {
    const book = await Book.findById(id);
    if (!book) throw newError({ message: "Book not found", statusCode: 404 });
    const updatedBook = await Book.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    return updatedBook;
  } catch (error) {
    throw error;
  }
};

export default updateOne;
