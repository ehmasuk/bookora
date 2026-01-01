import type { RequestHandler } from "express";
export type UserControllersType = {
    getAllUsers: RequestHandler;
    getSingleUser: RequestHandler;
};
declare const userControllers: UserControllersType;
export default userControllers;
//# sourceMappingURL=user.d.ts.map