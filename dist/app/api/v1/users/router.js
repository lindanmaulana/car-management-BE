"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../../../../middlewares/auth"));
const route = (0, express_1.default)();
route.post("/auth/signup", controller_1.UserControllers.signUp);
route.post("/auth/signin", controller_1.UserControllers.signIn);
route.patch("/users/update", auth_1.default.authenticatedUser, controller_1.UserControllers.update);
route.get("/users/profile", auth_1.default.authenticatedUser, controller_1.UserControllers.getOne);
route.get("/users", auth_1.default.authenticatedUser, auth_1.default.authorizedRoles("admin"), controller_1.UserControllers.getAll);
exports.default = route;
