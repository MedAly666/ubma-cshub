import { Router } from "express";
import {
  createResource,
  deleteResource,
  getResource,
  getResources,
  updateResource,
} from "../handlers/resources";
import { isAdmin } from "../middlewares/auth";

const resourcesRouter = Router();

resourcesRouter.post("/", isAdmin, createResource);
resourcesRouter.get("/:id", getResource);
resourcesRouter.delete("/:id", isAdmin, deleteResource);
resourcesRouter.put("/:id", isAdmin, updateResource);
resourcesRouter.get("/", getResources);

export default resourcesRouter;
