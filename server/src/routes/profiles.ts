import { Router } from "express";
import { deleteProfile, getProfile, updateProfile } from "../handlers/profiles";
import { isAdmin } from "../middlewares/auth";

const profilesRouter = Router();

profilesRouter.get("/", isAdmin, getProfile);
profilesRouter.delete("/", isAdmin, deleteProfile);
profilesRouter.put("/", isAdmin, updateProfile);

export default profilesRouter;
