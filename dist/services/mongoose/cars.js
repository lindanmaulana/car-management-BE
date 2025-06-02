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
exports.CarServices = void 0;
const model_1 = __importDefault(require("../../app/api/v1/cars/model"));
const brands_1 = require("./brands");
const model_2 = __importDefault(require("../../app/api/v1/car_images/model"));
const errors_1 = require("../../app/errors");
const cars_1 = require("../../app/utils/cars");
const cars_2 = require("../../app/validated/cars");
const validation_1 = require("../../app/validated/validation");
const car_images_1 = require("./car-images");
const mongoose_1 = __importDefault(require("mongoose"));
class CarServices {
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(cars_2.CarValidation.CREATE, req);
            yield brands_1.BrandServices.checkingBrand(request.brand_id);
            const checkCarDuplicate = yield model_1.default.findOne({ name: request.name, model: request.model, brand_id: request.brand_id });
            if (checkCarDuplicate)
                throw new errors_1.BadRequestError("Car is already exist!");
            const result = (yield model_1.default.create(request));
            if (!result)
                throw new errors_1.BadRequestError("An error occurred while saving data");
            const resultWithBrand = yield model_1.default.findById({ _id: result._id }).populate({
                path: "brand_id",
                select: "_id name country"
            });
            return (0, cars_1.toCarResponse)(resultWithBrand);
        });
    }
    static getALl(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(cars_2.CarValidation.GETALL, req);
            let condition = {};
            if (request.keyword) {
                condition = Object.assign(Object.assign({}, condition), { name: { $regex: new RegExp(request.keyword, "i") } });
            }
            if (request.brand) {
                yield brands_1.BrandServices.checkingBrand(request.brand);
                condition = Object.assign(Object.assign({}, condition), { brand_id: request.brand });
            }
            const result = yield model_1.default.aggregate([
                {
                    $match: condition
                },
                {
                    $lookup: {
                        from: "car_images",
                        localField: "_id",
                        foreignField: "car_id",
                        as: "images"
                    }
                },
                {
                    $lookup: {
                        from: "brands",
                        localField: "brand_id",
                        foreignField: "_id",
                        as: "brand_id"
                    }
                },
                {
                    $unwind: {
                        path: "$brand_id",
                        preserveNullAndEmptyArrays: true
                    }
                }
            ]);
            return (0, cars_1.toCarResponses)(result);
        });
    }
    static getOne(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(cars_2.CarValidation.GETONE, req);
            const result = yield model_1.default.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.default.Types.ObjectId(request.id)
                    }
                },
                {
                    $lookup: {
                        from: "car_images",
                        localField: "_id",
                        foreignField: "car_id",
                        as: "images"
                    }
                },
                {
                    $lookup: {
                        from: "brands",
                        localField: "brand_id",
                        foreignField: "_id",
                        as: "brand_id"
                    }
                },
                {
                    $unwind: {
                        path: "$brand_id",
                        preserveNullAndEmptyArrays: true
                    }
                }
            ]);
            return (0, cars_1.toCarResponse)(result[0]);
        });
    }
    static update(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(cars_2.CarValidation.UPDATE, req);
            let condition = {};
            const checkCar = yield model_1.default.findById({ _id: id });
            if (!checkCar)
                throw new errors_1.NotfoundError("Car not found!");
            if (request.name) {
                condition = Object.assign(Object.assign({}, condition), { name: request.name });
            }
            if (request.brand_id) {
                yield brands_1.BrandServices.checkingBrand(request.brand_id);
                condition = Object.assign(Object.assign({}, condition), { brand_id: request.brand_id });
            }
            if (request.model) {
                condition = Object.assign(Object.assign({}, condition), { model: request.model });
            }
            if (request.status) {
                if (checkCar.status === request.status)
                    throw new errors_1.BadRequestError("All data is up to date, no changes need to be saved.");
                condition = Object.assign(Object.assign({}, condition), { status: request.status });
            }
            if (request.price) {
                condition = Object.assign(Object.assign({}, condition), { price: request.price });
            }
            if (request.thumbnail) {
                condition = Object.assign(Object.assign({}, condition), { thumbnail: request.thumbnail });
            }
            const result = yield model_1.default.findByIdAndUpdate({ _id: id }, { $set: condition }, { new: true, runValidators: true });
            if (!result)
                throw new errors_1.BadRequestError("An error occurred while update data!");
            const resultUpdate = yield model_1.default.findById({ _id: result._id }).populate({
                path: "brand_id",
                select: "_id name country"
            });
            return (0, cars_1.toCarResponse)(resultUpdate);
        });
    }
    static delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(cars_2.CarValidation.DELETE, req);
            const result = yield model_1.default.findById({ _id: request.id });
            if (!result)
                throw new errors_1.NotfoundError("Car not found!");
            const resultCarImage = yield model_2.default.find({ car_id: result._id });
            const carIdStr = result._id.toString();
            if (resultCarImage.length > 0) {
                yield car_images_1.CarImageServices.deleteMany({ car_id: carIdStr });
            }
            yield model_1.default.findByIdAndDelete({ _id: result.id });
            return (0, cars_1.toCarResponse)(result);
        });
    }
    static checkingCar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield model_1.default.findById({ _id: id });
            if (!result)
                throw new errors_1.NotfoundError("Car not found!");
            return (0, cars_1.toCarResponse)(result);
        });
    }
}
exports.CarServices = CarServices;
