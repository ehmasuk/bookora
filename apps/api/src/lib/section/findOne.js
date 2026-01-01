import { Section } from "../../models/index.js";
const findOne = async ({ filter, populate = null }) => {
    try {
        const query = Section.findOne(filter);
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