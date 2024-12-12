import { Router } from "express";
import { login, verifyTokenn } from "../handlers/auth";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/verify-token", verifyTokenn);

export default authRouter;
