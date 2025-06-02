"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unauthenticated_1 = require("../app/errors/unauthenticated");
const create_jwt_1 = __importDefault(require("../utils/create-jwt"));
const authenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(' ')[1];
        }
        if (!token)
            throw new unauthenticated_1.UnauthenticatedError("Authenticated invalid");
        const payload = create_jwt_1.default.isTokenValid({ token });
        req.user = {
            _id: payload._id,
            name: payload.name,
            role: payload.role
        };
        next();
    }
    catch (err) {
        next(err);
    }
});
const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new unauthenticated_1.UnauthenticatedError("Unauthorized to access this route");
        }
        next();
    };
};
exports.default = {
    authenticatedUser,
    authorizedRoles
};
