"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../../../../middlewares/multer"));
const auth_1 = __importDefault(require("../../../../middlewares/auth"));
const controller_1 = require("./controller");
const route = (0, express_1.default)();
route.post("/car-images/:id", auth_1.default.authenticatedUser, auth_1.default.authorizedRoles("admin"), multer_1.default.single("image"), controller_1.CarImageController.create);
route.get("/car-images", auth_1.default.authenticatedUser, controller_1.CarImageController.getAll);
route.patch("/car-images/:id", auth_1.default.authenticatedUser, auth_1.default.authorizedRoles("admin"), controller_1.CarImageController.update);
route.delete("/car-images/:id", auth_1.default.authenticatedUser, auth_1.default.authorizedRoles("admin"), controller_1.CarImageController.delete);
exports.default = route;
