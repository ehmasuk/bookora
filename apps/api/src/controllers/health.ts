import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../types/index.js";

const checkHealth = async (_req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({
      code: 200,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};
export default checkHealth;
