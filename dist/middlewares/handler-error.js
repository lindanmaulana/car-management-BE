"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, try again later",
    };
    // error validation dari mongoose
    if (err instanceof zod_1.ZodError) {
        const readableMsg = err.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ");
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        customError.msg = readableMsg;
    }
    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    // error duplicate key dari mongoose
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue || {})} field, please choose another value`;
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    // error cast dari mongoose
    if (err.name === "CastError") {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    // error dari multer (ENOENT = no such file or directory)
    if (err.code === "ENOENT") {
        customError.msg =
            "The specified directory for saving the file was not found";
        customError.statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    }
    // JWT token expired
    if (err.name === "TokenExpiredError") {
        customError.msg = "Your session has expired, please log in again";
        customError.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
    // JWT invalid token
    if (err.name === "JsonWebTokenError") {
        customError.msg = "Invalid token, please log in again";
        customError.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
    // ReferenceError
    if (err.name === "ReferenceError") {
        customError.msg = `A reference error occurred, please check your code, ${err.message || err.toString()}`;
        customError.statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    }
    res.status(customError.statusCode).json({
        msg: customError.msg,
    });
};
exports.default = errorHandlerMiddleware;
