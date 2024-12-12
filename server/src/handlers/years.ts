import { asyncWrapper } from "../middlewares/async";
import { Request, Response, NextFunction } from "express-serve-static-core";
import {
  addYear,
  editYear,
  findYearByID,
  findYears,
  removeYear,
} from "../services/years";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/errors";
import { CreateYear, UpdateYear } from "../dtos/years";

export const getYear = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const year = await findYearByID(id);
    if (!year) {
      return next(new NotFoundError("Year not found"));
    }
    res.status(StatusCodes.OK).json({ year });
  }
);

interface CreateYearRequestBody extends CreateYear {}
export const createYear = asyncWrapper(
  async (
    req: Request<{}, {}, CreateYearRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { yearNumber, majorId } = req.body;
    const year = await addYear({ yearNumber, majorId });
    res.status(StatusCodes.CREATED).json({ year });
  }
);
export const getYears = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const years = await findYears();
    res.status(StatusCodes.OK).json({ years });
  }
);
export const deleteYear = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const year = await findYearByID(id);
    if (!year) {
      return next(new NotFoundError("Year not found"));
    }
    const deletedYear = await removeYear(id);
    res.status(StatusCodes.OK).json({ deletedYear });
  }
);

interface UpdateYearRequestBody extends UpdateYear {}
export const updateYear = asyncWrapper(
  async (
    req: Request<{ id: string }, UpdateYearRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const year = await findYearByID(id);
    if (!year) {
      return next(new NotFoundError("Year not found"));
    }
    const updatedYear = await editYear(id, req.body);
    res.status(StatusCodes.OK).json({ year: updatedYear });
  }
);
