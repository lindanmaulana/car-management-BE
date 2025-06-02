"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../../middlewares/auth"));
const controller_1 = require("./controller");
const route = (0, express_1.default)();
route.post("/brands", auth_1.default.authenticatedUser, auth_1.default.authorizedRoles("admin"), controller_1.BrandControllers.create);
route.get("/brands", controller_1.BrandControllers.getAll);
route.get("/brands/:id", controller_1.BrandControllers.getOne);
route.patch("/brands/:id", auth_1.default.authenticatedUser, auth_1.default.authorizedRoles("admin"), controller_1.BrandControllers.update);
route.delete("/brands/:id", auth_1.default.authenticatedUser, auth_1.default.authorizedRoles("admin"), controller_1.BrandControllers.delete);
exports.default = route;
