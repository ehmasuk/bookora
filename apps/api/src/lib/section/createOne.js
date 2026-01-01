import { Chapter, Section } from "../../models/index.js";
import newError from "../../utils/newError.js";
const createOne = async ({ title, chapterId }) => {
    try {
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            throw newError({ message: "Chapter not found", statusCode: 404 });
        }
        // get the last chapter's position for this book
        const lastSection = await Section.findOne({ chapter: chapterId }).sort({ position: -1 }).select("position");
        // assign next position safely
        const nextPosition = lastSection ? lastSection.position + 1 : 0;
        const newSection = new Section({
            title,
            chapter: chapterId,
            position: nextPosition,
        });
        return await newSection.save();
    }
    catch (error) {
        throw error;
    }
};
export default createOne;
//# sourceMappingURL=createOne.js.map