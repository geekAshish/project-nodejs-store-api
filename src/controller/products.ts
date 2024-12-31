import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/async";

export const getAllProductsStatic = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ name: "name" });
    // next({ error: "this is error" });
  }
);
export const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    res.status(200).json({ name: "ashish" });
  }
);
