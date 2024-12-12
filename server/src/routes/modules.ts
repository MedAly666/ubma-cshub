import { Router } from "express";
import {
  createModule,
  deleteModule,
  getModule,
  getModules,
  updateModule,
} from "../handlers/modules";
import { isAdmin } from "../middlewares/auth";

const modulesRouter = Router();

modulesRouter.get("/:id", getModule);
modulesRouter.post("/", isAdmin, createModule);
modulesRouter.delete("/:id", isAdmin, deleteModule);
modulesRouter.get("/", getModules);
modulesRouter.put("/:id", isAdmin, updateModule);

export default modulesRouter;
