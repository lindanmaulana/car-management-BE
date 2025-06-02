"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_error_1 = require("./custom-api-error");
class UnauthenticatedError extends custom_api_error_1.CustomAPIError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
