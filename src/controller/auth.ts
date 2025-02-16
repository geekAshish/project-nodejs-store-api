import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/async";
import jwt from "jsonwebtoken";
import { errors } from "../error";

export const login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    // validation ways
    // a. mongoose schema validation
    // b. Joi
    // c. check in controller
    if (!username || !password) {
      throw new errors.BadRequest("please provide email and password");
    }

    // just for the demo, normally provided by the db
    const id = new Date().getDate();

    // try to keep payload small
    const token = jwt.sign({ id, username }, process.env.JWT_TOKEN as string, {
      expiresIn: "30d",
    });

    res.status(200).json({
      msg: `User created successfully:`,
      username,
      password,
      token,
    });
  }
);

export const dashboard = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const luckyNumber = Math.floor(Math.random() * 100 + 1);

    const { username } = (req as any)?.user;

    res.status(200).json({
      msg: `Hello, ${username}`,
      secret: `this is your lucky number: ${luckyNumber}`,
    });
  }
);
