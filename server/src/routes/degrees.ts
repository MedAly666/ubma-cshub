import {
  getDegree,
  createDegree,
  getDegrees,
  updateDegree,
  deleteDegree,
} from "../handlers/degrees";

import { Router } from "express";
import { isAdmin } from "../middlewares/auth";

const degreesRouter = Router();

degreesRouter.get("/", getDegrees);
degreesRouter.post("/", isAdmin, createDegree);
degreesRouter.delete("/:id", isAdmin, deleteDegree);
degreesRouter.put("/:id", isAdmin, updateDegree);
degreesRouter.get("/:id", getDegree);

export default degreesRouter;
