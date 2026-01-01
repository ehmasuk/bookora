import { z } from "zod";
import entitySchemas from "./entitySchemas.js";
// register reqbody
const userRegisterSchema = z.object({
    name: entitySchemas.user.name,
    email: entitySchemas.user.email,
    password: entitySchemas.user.password,
});
// login request body
const userLoginSchema = z.object({
    email: entitySchemas.user.email,
    password: entitySchemas.user.password,
});
export { userRegisterSchema, userLoginSchema };
//# sourceMappingURL=userSchemas.js.map