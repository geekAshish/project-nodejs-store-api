import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/connect";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";
import productsRouter from "./routes/products";

config();

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());

// route
app.use("/api/v1/products", productsRouter);

app.use(notFound as any);
app.use(errorHandlerMiddleware as any);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`server is listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
