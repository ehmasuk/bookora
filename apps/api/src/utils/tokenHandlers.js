import jwt from "jsonwebtoken";
import env from "../config/env.js";
import newError from "./newError.js";
const createToken = (id) => {
    const token = jwt.sign({ id }, env.JWT_SECRET);
    if (!token) {
        throw newError({ message: "Failed to create token", statusCode: 500 });
    }
    return token;
};
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return false;
    }
};
export { createToken, verifyToken };
//# sourceMappingURL=tokenHandlers.js.map