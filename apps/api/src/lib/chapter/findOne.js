import { Chapter } from "../../models/index.js";
// find one chapter
const findOne = async ({ filter, populate = null }) => {
    try {
        const query = Chapter.findOne(filter);
        if (populate) {
            populate.forEach((path) => query.populate(path));
        }
        return await query.exec();
    }
    catch (error) {
        throw error;
    }
};
export default findOne;
//# sourceMappingURL=findOne.js.map