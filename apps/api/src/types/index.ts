import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export type SortTypes = "ASC" | "DESC";

// common
export interface CustomRequest extends Request {
  user?: any
}
export interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

export interface DecodedTokenType extends JwtPayload {
  id: string;
}
