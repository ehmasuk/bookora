import type { RequestHandler } from "express";
import { Model } from "mongoose";
interface Params {
    model: Model<any>;
    paramName: string;
    ownerField: string;
}
declare const isOwned: ({ model, paramName, ownerField }: Params) => RequestHandler;
export default isOwned;
//# sourceMappingURL=isOwned.d.ts.map