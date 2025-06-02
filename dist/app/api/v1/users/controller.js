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
exports.UserControllers = void 0;
const users_1 = require("../../../../services/mongoose/users");
const http_status_codes_1 = require("http-status-codes");
class UserControllers {
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = req.body;
                const result = yield users_1.UserServices.signUp(requestBody);
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    success: true,
                    message: "Signup successfully",
                    data: result,
                    total: 1,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = req.body;
                const result = yield users_1.UserServices.signIn(requestBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Signin successfully",
                    data: result,
                    total: 1
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
                const result = yield users_1.UserServices.getAll(requestQuery);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Data user retrieved successfully",
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
                const requestUser = req.user;
                const result = yield users_1.UserServices.getOne(requestUser._id);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Data user retrieved successfully",
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
                const requestUser = req.user;
                const requestBody = req.body;
                const result = yield users_1.UserServices.update(requestUser, requestBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Update data user successfully",
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
exports.UserControllers = UserControllers;
