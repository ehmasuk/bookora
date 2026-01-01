import { Chapter } from "../../models/index.js";
import newError from "../../utils/newError.js";
import findOne from "./findOne.js";
const updateOne = async ({ id, update }) => {
    try {
        const chapter = await Chapter.findById(id);
        if (!chapter)
            throw newError({ message: "Chapter not found", statusCode: 404 });
        const updatedChapter = await Chapter.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        return updatedChapter;
    }
    catch (error) {
        throw error;
    }
};
export default updateOne;
//# sourceMappingURL=updateOne.js.map