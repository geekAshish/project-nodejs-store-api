import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/async";
import { ProductModel } from "../models/products";
import { ProductsQueryInterface } from "../modules/interface/product";

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
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject: any = {};

    if (featured) {
      queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
      queryObject.company = company;
    }
    if (name) {
      queryObject.name = { $regex: name, $options: "i" }; // mongodb query operators
    }
    // numeric filters for range type values
    if (numericFilters) {
      const operatorMap = {
        ">": "$gt",
        ">=": "$gte",
        "=": "$eq",
        "<": "$lt",
        "<=": "$lte",
      };
      const regEx = /\b(<|>|=|<=|>=)\b/g;
      let filters: any = (numericFilters as any).replace(
        regEx,
        (match: ">" | ">=" | "=" | "<" | "<=") => `-${operatorMap?.[match]}-`
      );
      const options = ["rating", "price"];
      filters = filters.split(",").forEach((item: string) => {
        const [field, operator, value] = item?.split("-");
        if (options.includes(field)) {
          queryObject[field] = { [operator]: Number(value) };
        }
      });
    }

    let result = ProductModel.find(queryObject); // we'll remove await here because we need ProductModel promise for sorting letter on

    // sort
    if (sort) {
      const sortList = (sort as any)?.split(",")?.join(" ");
      result = result.sort(sortList);
    } else {
      result = result.sort("createdAt");
    }

    // select
    if (fields) {
      const fieldsList = (fields as any)?.split(",")?.join(" ");
      result = result.select(fieldsList);
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result; // at the end we'll await to get data from promise

    res.status(200).json({ products, nbHits: products?.length || 0 });
  }
);
