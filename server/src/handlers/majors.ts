import { NextFunction, Request, Response } from "express-serve-static-core";
import {
  addMajor,
  editMajor,
  findMajorByID,
  removeMajor,
  findMajors,
} from "../services/majors";
import { asyncWrapper } from "../middlewares/async";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/errors";
import { CreateMajor, UpdateMajor } from "../dtos/majors";

interface CreateMajorReqBody extends CreateMajor {}

export const createMajor = asyncWrapper(
  async (
    req: Request<{}, {}, CreateMajorReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, code, degreeId } = req.body;
    const major = await addMajor({
      name,
      description,
      code,
      degreeId,
    });
    res.status(StatusCodes.CREATED).json({ major });
  }
);

export const getMajor = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const major = await findMajorByID(id);
    if (!major) {
      return next(new NotFoundError("Major not found"));
    }
    res.status(StatusCodes.OK).json({ major });
  }
);

export const getMajors = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const majors = await findMajors();
    res.status(StatusCodes.OK).json({ majors });
  }
);

export const deleteMajor = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const major = await findMajorByID(id);
    if (!major) {
      return next(new NotFoundError("Major not found"));
    }
    const deletedMajor = await removeMajor(id);
    res.status(StatusCodes.OK).json({ deletedMajor });
  }
);

interface UpdateMajorReqBody extends UpdateMajor {}

export const updateMajor = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, UpdateMajorReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const major = await findMajorByID(id);
    if (!major) {
      return next(new NotFoundError("Degree not found"));
    }

    const updatedMajor = await editMajor(id, req.body);
    res.status(StatusCodes.OK).json({ major: updatedMajor });
  }
);
