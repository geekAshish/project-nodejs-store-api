import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/async";
import { ProductModel } from "../models/products";

export const getAllProductsStatic = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    // const products = await ProductModel.find({});
    const products = await ProductModel.find({ name: "accent chair" });
    res.status(200).json({ products, nbHits: products?.length });
    // next({ error: "this is error" });
  }
);
export const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    res.status(200).json({ name: "ashish" });
  }
);
