import { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    // enum: ["ikea", "tiddy", "caressa", "marcos"],
    enum: {
      values: ["ikea", "tiddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

export const productModel = model("Product", productSchema);
