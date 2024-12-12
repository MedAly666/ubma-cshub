import { Router } from "express";
import {
  createSemester,
  deleteSemester,
  getSemester,
  getSemesters,
  updateSemester,
} from "../handlers/semesters";
import { isAdmin } from "../middlewares/auth";

const semestersRouter = Router();

semestersRouter.post("/", isAdmin, createSemester);
semestersRouter.get("/:id", getSemester);
semestersRouter.get("/", getSemesters);
semestersRouter.delete("/:id", isAdmin, deleteSemester);
semestersRouter.put("/:id", isAdmin, updateSemester);

export default semestersRouter;
