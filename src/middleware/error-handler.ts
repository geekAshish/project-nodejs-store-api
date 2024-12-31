import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomAPIError } from "../error/custom-error";

export const errorHandlerMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    return res
      .status((err as any)?.statusCode)
      .json({ msg: (err as any)?.message });
  }

  return res
    .status(500)
    .json({ msg: "Something went wrong, Please try again" });
};
