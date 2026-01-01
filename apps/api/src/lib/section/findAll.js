import { Section } from "../../models/index.js";
// find alll books
const findAll = async ({ filter = {}, select = null, populate = null, limit = 10, page = 1, sort = "ASC" }) => {
    try {
        const query = Section.find(filter);
        query.limit(limit);
        // query.sort({ createdAt: sort === "ASC" ? 1 : -1 });
        query.sort({ position: 1 });
        const skip = (page - 1) * limit;
        query.skip(skip);
        if (populate && populate.length > 0) {
            populate.forEach((path) => query.populate(path));
        }
        if (select) {
            query.select(select);
        }
        const sections = await query.exec();
        return sections;
    }
    catch (error) {
        throw error;
    }
};
export default findAll;
//# sourceMappingURL=findAll.js.map