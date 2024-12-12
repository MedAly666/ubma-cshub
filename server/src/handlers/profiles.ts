import { NextFunction, Request, Response } from "express-serve-static-core";
import { editUser, removeUser } from "../services/users";
import { asyncWrapper } from "../middlewares/async";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/password";

export const getProfile = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);
    const user = req.user;
    res.status(StatusCodes.OK).json({ profile: user });
  }
);

export const deleteProfile = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const deletedAdmin = await removeUser(user.id);
    res.status(StatusCodes.OK).json({ deletedProfile: deletedAdmin });
  }
);

interface UpdateProfileRequestBody {
  username: string;
  email: string;
  password: string;
}
export const updateProfile = asyncWrapper(
  async (
    req: Request<{}, {}, UpdateProfileRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, username, password } = req.body;
    const user = req.user;
    const hashedPassword = await hashPassword(password);
    const profile = await editUser(user.id, {
      email,
      username,
      password: hashedPassword,
      role: user.role,
    });
    res.status(StatusCodes.OK).json({ profile });
  }
);
