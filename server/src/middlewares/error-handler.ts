import { Request, Response, NextFunction } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/custom-error";
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};
