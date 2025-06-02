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
exports.UserServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_1 = __importDefault(require("../../app/api/v1/users/model"));
const errors_1 = require("../../app/errors");
const users_1 = require("../../app/utils/users");
const users_2 = require("../../app/validated/users");
const validation_1 = require("../../app/validated/validation");
const create_jwt_1 = __importDefault(require("../../utils/create-jwt"));
const create_token_1 = require("../../utils/create-token");
class UserServices {
    static signUp(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(users_2.UserValidations.SIGINUP, req);
            if (request.password !== request.confirmPassword)
                throw new errors_1.BadRequestError("Password is not mathcing confirmPassword!");
            const checkUser = yield model_1.default.findOne({ email: request.email });
            if (checkUser)
                throw new errors_1.BadRequestError("Your email has been registered");
            const result = (yield model_1.default.create({
                name: request.name,
                email: request.email,
                password: request.password,
            }));
            return (0, users_1.toUserResponse)(result);
        });
    }
    static signIn(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(users_2.UserValidations.SIGNIN, req);
            const check = yield model_1.default.findOne({ email: request.email });
            if (!check)
                throw new errors_1.BadRequestError("Invalid credentials!");
            const isPasswordCorrect = yield check.comparePassword(request.password);
            if (!isPasswordCorrect)
                throw new errors_1.BadRequestError("Invalid credentials!");
            const result = check;
            const token = create_jwt_1.default.createJwt({ payload: (0, create_token_1.createToken)(result) });
            return {
                _id: result._id,
                name: result.name,
                role: result.role,
                token
            };
        });
    }
    static getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(users_2.UserValidations.GETALL, req);
            let condition = {};
            if (request.keyword) {
                condition = Object.assign(Object.assign({}, condition), { keyword: { $regex: request.keyword, $option: "i" } });
            }
            const result = yield model_1.default.find(condition);
            return (0, users_1.toUserResponses)(result);
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield model_1.default.findById({ _id: id });
            if (!checkUser)
                throw new errors_1.NotfoundError("User not found!");
            return (0, users_1.toUserResponse)(checkUser);
        });
    }
    static update(user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(users_2.UserValidations.UPDATE, req);
            const checkUser = yield model_1.default.findById({ _id: user._id });
            if (!checkUser)
                throw new errors_1.NotfoundError("User not found!");
            let condition = {};
            if (request.name) {
                condition = Object.assign(Object.assign({}, condition), { name: request.name });
            }
            if (request.password && request.confirmPassword) {
                if (request.password !== request.confirmPassword)
                    throw new errors_1.BadRequestError("Password is not mathcing confirmPassword!");
                condition = Object.assign(Object.assign({}, condition), { password: yield bcrypt_1.default.hash(request.password, 10) });
            }
            const result = yield model_1.default.findByIdAndUpdate({ _id: checkUser._id }, { $set: condition }, { new: true, runValidators: true });
            if (!result)
                throw new errors_1.BadRequestError("An error occurred while changing data");
            return (0, users_1.toUserResponse)(result);
        });
    }
    static checkingUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield model_1.default.findById({ _id: id });
            if (!result)
                throw new errors_1.NotfoundError("User not found");
            return (0, users_1.toUserResponse)(result);
        });
    }
}
exports.UserServices = UserServices;
