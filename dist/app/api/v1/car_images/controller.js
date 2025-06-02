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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarImageController = void 0;
const http_status_codes_1 = require("http-status-codes");
const car_images_1 = require("../../../../services/mongoose/car-images");
class CarImageController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestParams = { id: req.params.id };
                const result = yield car_images_1.CarImageServices.create(req, requestParams.id);
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    success: true,
                    message: "Car Image created successfully",
                    data: result,
                    total: 1,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestQuery = req.query;
                const result = yield car_images_1.CarImageServices.getAll(requestQuery);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Data car image retrieved successfully",
                    data: result,
                    total: result.length,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestParams = { id: req.params.id };
                const requestBody = req.body;
                const result = yield car_images_1.CarImageServices.update(requestParams.id, requestBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Data's car update was successful",
                    data: result,
                    total: 1
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestParams = { id: req.params.id };
                const result = yield car_images_1.CarImageServices.delete(requestParams);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Delete car image data successfully",
                    data: result,
                    total: 1
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.CarImageController = CarImageController;
