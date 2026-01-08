import { Section } from "../../models/index.js";
// find alll sections
const findAll = async ({ filter = {}, select = null, populate = null, limit = 10, page = 1, sort = "ASC" }) => {
    try {
        const query = Section.find(filter);
        if (limit == 'none') {
            query.limit(10_000);
        }
        else {
            query.limit(limit);
            query.skip((page - 1) * limit);
        }
        query.sort({ position: 1 });
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