import type { RequestHandler } from "express";
export type SeedControllersType = {
    seedBooks: RequestHandler;
    seedUsers: RequestHandler;
};
declare const seedControllers: SeedControllersType;
export default seedControllers;
//# sourceMappingURL=seed.d.ts.map