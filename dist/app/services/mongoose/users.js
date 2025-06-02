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
const model_1 = __importDefault(require("../../api/v1/users/model"));
const errors_1 = require("../../errors");
const users_1 = require("../../utils/users");
const users_2 = require("../../validated/users");
const validation_1 = require("../../validated/validation");
class UserServices {
    static signUp(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(users_2.UserValidations.SIGINUP, req);
            if (request.password !== request.confirmPassword)
                throw new errors_1.BadRequestError("Password is not mathcing confirmPassword!");
            const checkUser = yield model_1.default.findOne({ email: request.email });
            if (checkUser)
                throw new errors_1.BadRequestError("Your email has been registered");
            const result = yield model_1.default.create({
                name: request.name,
                email: request.email,
                password: request.password
            });
            return (0, users_1.toUserResponse)(result);
        });
    }
}
exports.UserServices = UserServices;
