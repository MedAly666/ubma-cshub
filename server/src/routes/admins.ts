import { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
} from "../handlers/admins";
import { isAdmin } from "../middlewares/auth";

const adminsRouter = Router();

adminsRouter.post("/", isAdmin, createAdmin);
adminsRouter.get("/:id", isAdmin, getAdmin);
adminsRouter.get("/", isAdmin, getAdmins);
adminsRouter.put("/:id", isAdmin, updateAdmin);
adminsRouter.delete("/:id", isAdmin, deleteAdmin);

export default adminsRouter;
