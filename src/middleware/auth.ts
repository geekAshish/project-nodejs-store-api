import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errors } from "../error";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new errors.UnauthenticatedError("no token provided");
  }
  const token = authHeader.split(" ")?.[1];

  try {
    const decode = jwt.verify(
      token,
      process.env.JWT_TOKEN as string
    ) as JwtPayload;

    const { id, username } = decode;
    (req as any).user = { id, username };
    console.log("this is it", { username, id });

    next();
  } catch (error) {
    throw new errors.UnauthenticatedError("Not authorize to access this route");
  }
};
