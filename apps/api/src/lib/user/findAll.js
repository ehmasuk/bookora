import { User } from "../../models/index.js";
// find alll users
const findAll = async ({ filter = {}, select = null, populate = null, limit = 10, page = 1, sort = "ASC" }) => {
    try {
        const query = User.find(filter);
        query.limit(limit);
        query.sort({ createdAt: sort === "ASC" ? 1 : -1 });
        const skip = (page - 1) * limit;
        query.skip(skip);
        if (populate) {
            populate.forEach((item) => query.populate(item));
        }
        if (select) {
            query.select(select);
        }
        query.select("-password");
        const users = await query.exec();
        return users;
    }
    catch (error) {
        throw error;
    }
};
export default findAll;
//# sourceMappingURL=findAll.js.map