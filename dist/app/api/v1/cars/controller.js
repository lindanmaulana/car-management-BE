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
exports.CarController = void 0;
const cars_1 = require("../../../../services/mongoose/cars");
const http_status_codes_1 = require("http-status-codes");
class CarController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const result = yield cars_1.CarServices.create(request);
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    success: true,
                    message: "Car created successfully",
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
                const result = yield cars_1.CarServices.getALl(requestQuery);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Data car retrieved successfully",
                    data: result,
                    total: result.length,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestParams = { id: req.params.id };
                const result = yield cars_1.CarServices.getOne(requestParams);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Data car retrieved successfully",
                    data: result,
                    total: 1
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
                const result = yield cars_1.CarServices.update(requestParams.id, requestBody);
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
                const result = yield cars_1.CarServices.delete(requestParams);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Delete car data successfully",
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
exports.CarController = CarController;
