import { NextFunction, Request, Response } from "express-serve-static-core";
import { asyncWrapper } from "../middlewares/async";
import { findUserByUsername } from "../services/users";
import { comparePassword } from "../utils/password";
import { generateToken, verifyToken } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, UnauthorizedError } from "../errors/errors";

interface LoginRequestBody {
  username: string;
  password: string;
}
export const login = asyncWrapper(
  async (
    req: Request<{}, {}, LoginRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);

    if (!user) {
      return next(new NotFoundError("User not found"));
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return next(new UnauthorizedError("Incorrect username or password"));
    }

    const token = generateToken(user.id);

    res.status(StatusCodes.OK).json({ token });
  }
);

interface VerifyTokenRequestBody {
  token: string;
}
export const verifyTokenn = asyncWrapper(
  async (
    req: Request<{}, {}, VerifyTokenRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { token } = req.body;
    try {
      await verifyToken(token);
    } catch (error) {
      res.status(StatusCodes.OK).json({ valid: false });
    }

    res.status(StatusCodes.OK).json({ valid: true });
  }
);
