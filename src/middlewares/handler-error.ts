import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

interface CustomError extends Error {
  statusCode?: number;
  code?: number | string;
  keyValue?: Record<string, any>;
  value?: string;
}

const errorHandlerMiddleware = ( err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  let customError = {
    statusCode: (err as any).statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  // error validation dari mongoose
  if(err instanceof ZodError) {
    const readableMsg = err.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = readableMsg;
  }

  if (err.name === "ValidationError") {
    customError.msg = Object.values((err as any).errors)
      .map((item: any) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // error duplicate key dari mongoose
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue || {}
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // error cast dari mongoose
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  // error dari multer (ENOENT = no such file or directory)
  if (err.code === "ENOENT") {
    customError.msg =
      "The specified directory for saving the file was not found";
    customError.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  // JWT token expired
  if (err.name === "TokenExpiredError") {
    customError.msg = "Your session has expired, please log in again";
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }

  // JWT invalid token
  if (err.name === "JsonWebTokenError") {
    customError.msg = "Invalid token, please log in again";
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }

  // ReferenceError
  if (err.name === "ReferenceError") {
    customError.msg = `A reference error occurred, please check your code, ${
      (err as any).message || err.toString()
    }`;
    customError.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

    res.status(customError.statusCode).json({
    msg: customError.msg,
  });
};


export default errorHandlerMiddleware