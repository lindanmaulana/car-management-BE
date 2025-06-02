"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.URL_MONGODB_DEV || !process.env.JWT_SECRET_KEY || !process.env.JWT_EXPIRATION) {
    throw new Error("Missing required environment variables");
}
exports.default = {
    URLDB: process.env.URL_MONGODB_DEV,
    JWTEXPIRATION: process.env.JWT_EXPIRATION,
    JWTSECRETKEY: process.env.JWT_SECRET_KEY
};
