import { Request, Response } from "express";
import { asyncWrapper } from "../middleware/async";

export const getAllProductsStatic = asyncWrapper(
  async (req: Request, res: Response) => {
    res.status(200).json({ name: "name" });
  }
);
export const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    res.status(200).json({ name: "ashish" });
  }
);
