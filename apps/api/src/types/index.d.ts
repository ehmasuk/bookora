import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
export type SortTypes = "ASC" | "DESC";
export interface CustomRequest extends Request {
    user?: {
        id: string;
    };
}
export interface ErrorWithStatusCode extends Error {
    statusCode?: number;
}
export interface DecodedTokenType extends JwtPayload {
    id: string;
}
//# sourceMappingURL=index.d.ts.map