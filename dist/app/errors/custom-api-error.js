"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAPIError = void 0;
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCodes = statusCode;
    }
}
exports.CustomAPIError = CustomAPIError;
