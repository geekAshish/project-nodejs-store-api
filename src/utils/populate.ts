import { config } from "dotenv";
import { connectDB } from "../db/connect";
import { ProductModel } from "../models/products";
import jsonProduct from "../constant/product.json";
config();

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await ProductModel.deleteMany();
    await ProductModel.create(jsonProduct);

    console.log(`connected to DB successfully`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
