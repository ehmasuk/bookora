import { Book, Chapter, Section } from "../../models/index.js";
const deleteOne = async (id: string) => {
  try {
    const chapters = await Chapter.find({ book: id });
    const chapterIds = chapters.map((ch) => ch._id);
    await Section.deleteMany({ chapter: { $in: chapterIds } });
    await Chapter.deleteMany({ book: id });
    await Book.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export default deleteOne;
