import { Section } from "../../models/index.js";
import newError from "../../utils/newError.js";
const updateOne = async ({ id, update }) => {
    try {
        const section = await Section.findById(id);
        if (!section)
            throw newError({ message: "Section not found", statusCode: 404 });
        const updatedsection = await Section.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        return updatedsection;
    }
    catch (error) {
        throw error;
    }
};
export default updateOne;
//# sourceMappingURL=updateOne.js.map