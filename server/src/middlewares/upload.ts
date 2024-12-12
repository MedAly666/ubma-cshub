import multer from "multer";
import path from "path";
import fs from "fs";
import { BadRequestError } from "../errors/errors";
import { Request } from "express";

const ensureDirExist = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const baseUploadDir = "uploads";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    let subDir = "others";

    if (file.mimetype.startsWith("image/")) subDir = "images";
    if (file.mimetype.startsWith("application/pdf")) subDir = "pdfs";

    const uploadDir = path.join(baseUploadDir, subDir);

    ensureDirExist(uploadDir);
    callback(null, uploadDir);
  },
  filename(req, file, callback) {
    const uniqueId = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(
      null,
      `${file.fieldname}-${uniqueId}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new BadRequestError("Only PDFs and images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB
});

export const singleUpload = (fieldName: string) => upload.single(fieldName);

export const multipleUpload = (fieldName: string, maxCount: number) =>
  upload.array(fieldName, maxCount);
