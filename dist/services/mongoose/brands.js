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
exports.BrandServices = void 0;
const model_1 = __importDefault(require("../../app/api/v1/brands/model"));
const model_2 = __importDefault(require("../../app/api/v1/cars/model"));
const errors_1 = require("../../app/errors");
const brands_1 = require("../../app/utils/brands");
const brands_2 = require("../../app/validated/brands");
const validation_1 = require("../../app/validated/validation");
class BrandServices {
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(brands_2.BrandValidations.CREATE, req);
            const check = yield model_1.default.findOne({ name: request.name, country: request.country });
            if (check)
                throw new errors_1.BadRequestError("The brand is already registered");
            const result = yield model_1.default.create({ name: request.name, country: request.country });
            if (!result)
                throw new errors_1.BadRequestError("An error occurred while saving data");
            return (0, brands_1.toBrandResponse)(result);
        });
    }
    static getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(brands_2.BrandValidations.GETALL, req);
            let condition = {};
            if (request.keyword) {
                condition = Object.assign(Object.assign({}, condition), { name: { $regex: new RegExp(request.keyword, "i") } });
            }
            if (request.country) {
                condition = Object.assign(Object.assign({}, condition), { country: request.country });
            }
            const result = yield model_1.default.find(condition);
            return (0, brands_1.toBrandResponses)(result);
        });
    }
    static getOne(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(brands_2.BrandValidations.GETONE, req);
            const result = yield model_1.default.findById({ _id: request.id });
            if (!result)
                throw new errors_1.NotfoundError("Brand not found");
            return (0, brands_1.toBrandResponse)(result);
        });
    }
    static update(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(brands_2.BrandValidations.UPDATE, req);
            let condition = {};
            yield BrandServices.checkingBrand(id);
            if (request.name) {
                const checkingDuplicated = yield model_1.default.findOne({ name: request.name, _id: { $ne: id } });
                if (checkingDuplicated)
                    throw new errors_1.BadRequestError("Brand name is already exist");
                condition = Object.assign(Object.assign({}, condition), { name: request.name });
            }
            if (request.country) {
                condition = Object.assign(Object.assign({}, condition), { country: request.country });
            }
            const result = yield model_1.default.findByIdAndUpdate({ _id: id }, { $set: condition }, { new: true, runValidators: true });
            if (!result)
                throw new errors_1.BadRequestError("An error occurred while changing data");
            return (0, brands_1.toBrandResponse)(result);
        });
    }
    static delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(brands_2.BrandValidations.DELETE, req);
            const result = yield model_1.default.findById({ _id: request.id });
            if (!result)
                throw new errors_1.NotfoundError("Brand not found!");
            yield model_1.default.findByIdAndDelete({ _id: request.id });
            yield model_2.default.deleteMany({ brand_id: request.id });
            return (0, brands_1.toBrandResponse)(result);
        });
    }
    static checkingBrand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield model_1.default.findById({ _id: id });
            if (!result)
                throw new errors_1.NotfoundError("Brand not found!");
            return (0, brands_1.toBrandResponse)(result);
        });
    }
}
exports.BrandServices = BrandServices;
