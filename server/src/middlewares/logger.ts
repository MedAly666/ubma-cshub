import morgan from "morgan";
import { Request, Response, NextFunction } from "express-serve-static-core";
export default function logger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  morgan.token("route", (req: Request) => req.originalUrl || req.url);
  morgan.token("status", (req: Request, res: Response) =>
    res.statusCode.toString()
  );
  const customFormat = ":method :route :status";
  morgan(customFormat)(req, res, next);
}
