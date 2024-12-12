import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error";

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string = "Internal Server Error") {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
