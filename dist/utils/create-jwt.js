"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthenticated_1 = require("../app/errors/unauthenticated");
const env_config_1 = __importDefault(require("../config/env.config"));
const createJwt = ({ payload }) => {
    const token = jsonwebtoken_1.default.sign(payload, env_config_1.default.JWTSECRETKEY, {
        expiresIn: "24h"
    });
    return token;
};
const isTokenValid = (({ token }) => {
    if (!env_config_1.default.JWTSECRETKEY)
        throw new Error("JWT secret key is not defined");
    try {
        const isValid = jsonwebtoken_1.default.verify(token, env_config_1.default.JWTSECRETKEY);
        return isValid;
    }
    catch (err) {
        let errorMessage = "An unexpected error occurred";
        if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            errorMessage = `Token Error : ${err.message}`;
        }
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            errorMessage = `Token expired : ${err.message}`;
        }
        if (err instanceof jsonwebtoken_1.default.NotBeforeError) {
            errorMessage = `Token not active : ${err.message}`;
        }
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        throw new unauthenticated_1.UnauthenticatedError(errorMessage);
    }
});
exports.default = {
    createJwt,
    isTokenValid
};
