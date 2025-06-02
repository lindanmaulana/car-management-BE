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
exports.BrandControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const brands_1 = require("../../../../services/mongoose/brands");
class BrandControllers {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = req.body;
                const result = yield brands_1.BrandServices.create(requestBody);
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    success: true,
                    message: "Successfully created brand data",
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
                const result = yield brands_1.BrandServices.getAll(requestQuery);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Brand data successfully retrieved",
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
                const result = yield brands_1.BrandServices.getOne(requestParams);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Brand data successfully retrieved",
                    data: result,
                    total: 1,
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
                const request = req.body;
                const result = yield brands_1.BrandServices.update(requestParams.id, request);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Data's brand update was successful",
                    data: result,
                    total: 1,
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
                const result = yield brands_1.BrandServices.delete(requestParams);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Delete brand data successfully",
                    data: result,
                    total: 1,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.BrandControllers = BrandControllers;
