import {
  getMajor,
  createMajor,
  getMajors,
  updateMajor,
  deleteMajor,
} from "../handlers/majors";

import { Router } from "express";
import { isAdmin } from "../middlewares/auth";

const majorsRouter = Router();

majorsRouter.get("/", getMajors);
majorsRouter.post("/", isAdmin, createMajor);
majorsRouter.delete("/:id", isAdmin, deleteMajor);
majorsRouter.put("/:id", isAdmin, updateMajor);
majorsRouter.get("/:id", getMajor);

export default majorsRouter;
