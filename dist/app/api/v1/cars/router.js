"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../../middlewares/auth"));
const controller_1 = require("./controller");
const route = (0, express_1.default)();
route.post("/cars", auth_1.default.authenticatedUser, auth_1.default.authorizedRoles("admin"), controller_1.CarController.create);
route.get("/cars", auth_1.default.authenticatedUser, controller_1.CarController.getAll);
route.get("/cars/:id", auth_1.default.authenticatedUser, controller_1.CarController.getOne);
route.patch("/cars/:id", auth_1.default.authenticatedUser, auth_1.default.authorizedRoles("admin"), controller_1.CarController.update);
route.delete("/cars/:id", auth_1.default.authenticatedUser, auth_1.default.authorizedRoles("admin"), controller_1.CarController.delete);
exports.default = route;
