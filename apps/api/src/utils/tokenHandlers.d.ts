import type { Types } from "mongoose";
import type { DecodedTokenType } from "../types/index.js";
declare const createToken: (id: Types.ObjectId) => string | never;
declare const verifyToken: (token: string) => DecodedTokenType | false;
export { createToken, verifyToken };
//# sourceMappingURL=tokenHandlers.d.ts.map