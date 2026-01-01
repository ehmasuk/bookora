import { User } from "../../models/index.js";
import checkUserExist from "../../utils/checkUserExist.js";
import newError from "../../utils/newError.js";
import { hashPassword } from "../../utils/passwordHandlers.js";
const createOne = async ({ name, email, password }) => {
    try {
        // check user already exist
        const userIsExist = await checkUserExist(email);
        if (userIsExist)
            throw newError({ message: "User already register, please login", statusCode: 409 });
        // hash user password
        const hashedPassword = hashPassword(password);
        if (!hashedPassword)
            throw newError({ message: "Cannot hash password", statusCode: 500 });
        // create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        return userWithoutPassword;
    }
    catch (error) {
        throw error;
    }
};
export default createOne;
//# sourceMappingURL=createOne.js.map