import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/async";
import { CustomAPIError } from "../error/custom-error";

export const login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    // validation ways
    // a. mongoose schema
    // b. Joi
    // c. check in controller
    if (!username || !password) {
      throw new CustomAPIError("please provide email and password", 400);
    }
    res.status(200).json({
      msg: `Fake login/register/sign-up route: ${username}, ${password}`,
    });
  }
);

export const dashboard = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const luckyNumber = Math.floor(Math.random() * 100 + 1);
    res.status(200).json({
      msg: "Hello, Ashish",
      secret: `this is your lucky number: ${luckyNumber}`,
    });
  }
);
