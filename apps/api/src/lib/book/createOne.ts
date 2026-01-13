import Book from "../../models/book.js";
import newError from "../../utils/newError.js";
import userServices from "../user/index.js";

export interface Props {
  title: string;
  authorId: string;
  summary?: string | undefined;
}

const createOne = async ({
  title,
  authorId,
  summary,
}: Props): Promise<object> => {
  try {
    const user = await userServices.findOne({ filter: { _id: authorId } });
    if (!user) {
      throw newError({ message: "User not found", statusCode: 404 });
    }
    const newBook = new Book({
      title,
      author: authorId,
      summary,
    });
    return await newBook.save();
  } catch (error) {
    throw error;
  }
};

export default createOne;
