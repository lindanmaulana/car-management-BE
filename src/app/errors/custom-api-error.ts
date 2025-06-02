export class CustomAPIError extends Error {
    public statusCodes: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCodes = statusCode
    }
}