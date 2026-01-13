import { Chapter, Section } from "../../models/index.js";
const deleteOne = async (id: string) => {
  try {
    await Section.deleteMany({ chapter: id });
    await Chapter.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export default deleteOne;
