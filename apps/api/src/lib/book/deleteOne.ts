import { Book } from "../../models/index.js";
const deleteOne = async (id: string) => {
  try {
    await Book.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export default deleteOne;
