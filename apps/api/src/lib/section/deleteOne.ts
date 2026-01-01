import { Section } from "../../models/index.js";
const deleteOne = async (id: string) => {
  try {
    await Section.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export default deleteOne;
