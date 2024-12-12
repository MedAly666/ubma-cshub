import { Router } from "express";
import {
  createYear,
  deleteYear,
  getYear,
  getYears,
  updateYear,
} from "../handlers/years";
import { isAdmin } from "../middlewares/auth";

const yearsRouter = Router();

yearsRouter.post("/", isAdmin, createYear);
yearsRouter.get("/:id", getYear);
yearsRouter.get("/", getYears);
yearsRouter.delete("/:id", isAdmin, deleteYear);
yearsRouter.put("/:id", isAdmin, updateYear);

export default yearsRouter;
