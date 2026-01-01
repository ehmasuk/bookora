import { Chapter } from "../../models/index.js";
const deleteOne = async (id: string) => {
  try {
    await Chapter.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export default deleteOne;
