import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-api-error";

export class InternalServerError extends CustomAPIError {
    constructor(message: string) {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR)
    }
}