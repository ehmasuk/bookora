import userServices from "../lib/user/index.js";
import newError from "../utils/newError.js";
import successResponse from "../utils/successResponse.js";
import { queryParamsSchema } from "../zodSchemas/bookSchemas.js";
// get all users
const getAllUsers = async (req, res, next) => {
    try {
        const include = req.query.include;
        // response without query
        if (!include) {
            const users = await userServices.findAll({});
            return successResponse({ res, data: users });
        }
        // reposne with query
        const populate = include.split(",");
        const users = await userServices.findAll({ populate });
        return successResponse({ res, data: users });
    }
    catch (error) {
        next(error);
    }
};
// get a single user
const getSingleUser = async (req, res, next) => {
    try {
        // get userid
        const { userId } = req.params;
        if (!userId)
            throw newError({ message: "User id not found", statusCode: 404 });
        const query = {
            filter: {
                _id: userId,
            },
        };
        const { include } = queryParamsSchema.parse(req.query);
        if (include) {
            query.populate = include.split(",");
        }
        const user = await userServices.findOne(query);
        // check user
        if (!user)
            throw newError({ message: "User not found", statusCode: 404 });
        return successResponse({ res, data: user });
    }
    catch (error) {
        next(error);
    }
};
const userControllers = {
    getAllUsers,
    getSingleUser,
};
export default userControllers;
//# sourceMappingURL=user.js.map