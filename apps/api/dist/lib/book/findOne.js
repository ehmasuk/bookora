import { Book } from "../../models/index.js";
const findOne = async ({ filter, populate = null, select = null }) => {
    try {
        const query = Book.findOne(filter);
        if (populate) {
            populate.forEach((path) => query.populate(path));
        }
        if (select) {
            query.select(select);
        }
        return await query.exec();
    }
    catch (error) {
        throw error;
    }
};
export default findOne;
//# sourceMappingURL=findOne.js.map