import jwt from "jsonwebtoken";
import type { Types } from "mongoose";
import env from "../config/env.js";
import type { DecodedTokenType } from "../types/index.js";
import newError from "./newError.js";

const createToken = (id: Types.ObjectId): string | never => {
  const token = jwt.sign({ id }, env.JWT_SECRET);
  if (!token) {
    throw newError({ message: "Failed to create token", statusCode: 500 });
  }
  return token;
};

const verifyToken = (token: string): DecodedTokenType | false => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedTokenType;
    return decoded;
  } catch (error) {
    return false;
  }
};

export { createToken, verifyToken };
