import type { RequestHandler } from "express";
import type { Types } from "mongoose";
export interface AuthResponseTypes {
    id: Types.ObjectId;
    name: string;
    email: string;
    status: string[];
}
export type AuthControllersType = {
    loginUser: RequestHandler;
    registerUser: RequestHandler;
};
declare const authControllers: AuthControllersType;
export default authControllers;
//# sourceMappingURL=auth.d.ts.map