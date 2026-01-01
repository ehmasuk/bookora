import { Book } from "../../models/index.js";
const deleteOne = async (id) => {
    try {
        await Book.findByIdAndDelete(id);
    }
    catch (error) {
        throw error;
    }
};
export default deleteOne;
//# sourceMappingURL=deleteOne.js.map