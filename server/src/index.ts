import express from "express";
import adminsRouter from "./routes/admins";
import authRouter from "./routes/auth";
import { isAdmin } from "./middlewares/auth";
import degreesRouter from "./routes/degrees";
import yearsRouter from "./routes/years";
import semestersRouter from "./routes/semesters";
import modulesRouter from "./routes/modules";
import majorsRouter from "./routes/majors";
import resourcesRouter from "./routes/resources";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import logger from "./middlewares/logger";
import profilesRouter from "./routes/profiles";
import { singleUpload } from "./middlewares/upload";
import { errorHandler } from "./middlewares/error-handler";

const PORT = process.env.PORT || 3000;
const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    credentials: true,
    origin: process.env.DASHBOARD_URL as string,
  })
);
server.use(logger);
server.get("/ping", (req, res) => {
  res.json({ pong: true });
});

server.get("/protected", isAdmin, (req, res) => {
  res.send("This is a protected route test");
});

server.use("/api/v1/admins", adminsRouter);
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/degrees", degreesRouter);
server.use("/api/v1/years", yearsRouter);
server.use("/api/v1/semesters", semestersRouter);
server.use("/api/v1/modules", modulesRouter);
server.use("/api/v1/resources", resourcesRouter);
server.use("/api/v1/profiles", profilesRouter);
server.use("/api/v1/majors", majorsRouter);

server.post("/upload", singleUpload("file"), (req, res) => {
  console.log(req.file);
  res.send("File uploaded");
});

server.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
