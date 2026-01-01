import userServices from "../lib/user/index.js";
import checkUserExist from "../utils/checkUserExist.js";
import newError from "../utils/newError.js";
import { verifyPassword } from "../utils/passwordHandlers.js";
import successResponse from "../utils/successResponse.js";
import { createToken } from "../utils/tokenHandlers.js";
import { userLoginSchema, userRegisterSchema } from "../zodSchemas/userSchemas.js";
// register User
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = userRegisterSchema.parse(req.body);
        // create a new user
        let newuser = await userServices.createOne({ name, email, password });
        const userResponse = {
            id: newuser._id,
            name: newuser.name,
            email: newuser.email,
            status: newuser.status,
        };
        // create token
        const token = createToken(userResponse.id);
        successResponse({ res, statusCode: 201, data: userResponse, extra: { token } });
    }
    catch (error) {
        next(error);
    }
};
// login User
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = userLoginSchema.parse(req.body);
        // check user exist
        const user = await checkUserExist(email);
        if (!user)
            throw newError({ message: "Authentication failed", statusCode: 401 });
        // check password
        const validPass = await verifyPassword(password, user.password);
        if (!validPass)
            throw newError({ message: "Authentication failed", statusCode: 401 });
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            status: user.status,
        };
        // create token
        const token = createToken(userResponse.id);
        // send response
        successResponse({ res, statusCode: 200, data: userResponse, extra: { token } });
    }
    catch (error) {
        next(error);
    }
};
const authControllers = {
    loginUser,
    registerUser,
};
export default authControllers;
//# sourceMappingURL=auth.js.map