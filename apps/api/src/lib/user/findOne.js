import { User } from "../../models/index.js";
const findOne = async ({ filter, populate = null }) => {
    try {
        const query = User.findOne(filter);
        if (populate) {
            populate.forEach((item) => query.populate(item));
        }
        return await query.exec();
    }
    catch (error) {
        throw error;
    }
};
export default findOne;
//# sourceMappingURL=findOne.js.map