import userServices from "../lib/user/index.js";
import newError from "../utils/newError.js";
import { verifyToken } from "../utils/tokenHandlers.js";
const isAuthenticated = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw newError({ message: "Please login first", statusCode: 404 });
        }
        const token = authHeader?.split(" ")[1];
        if (!token) {
            throw newError({ message: "Please login first", statusCode: 404 });
        }
        const validUser = verifyToken(token);
        if (!validUser) {
            throw newError({ message: "Invalid token", statusCode: 400 });
        }
        const user = await userServices.findOne({ filter: { _id: validUser.id } });
        if (!user) {
            throw newError({ message: "User not found", statusCode: 404 });
        }
        req.user = { id: user.id };
        next();
    }
    catch (error) {
        next(error);
    }
};
export default isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map