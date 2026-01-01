import type { NextFunction, Request, Response } from "express";

const checkHealth = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
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
