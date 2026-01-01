import { Section } from "../../models/index.js";
const deleteOne = async (id) => {
    try {
        await Section.findByIdAndDelete(id);
    }
    catch (error) {
        throw error;
    }
};
export default deleteOne;
//# sourceMappingURL=deleteOne.js.map