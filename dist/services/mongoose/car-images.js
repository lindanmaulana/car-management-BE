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
exports.CarImageServices = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const model_1 = __importDefault(require("../../app/api/v1/car_images/model"));
const errors_1 = require("../../app/errors");
const car_images_1 = require("../../app/utils/car-images");
const car_images_2 = require("../../app/validated/car-images");
const validation_1 = require("../../app/validated/validation");
const cars_1 = require("./cars");
const imagePathDefault = "/images/default-car.svg";
class CarImageServices {
    static create(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkCar = yield cars_1.CarServices.checkingCar(id);
            const checkImageCar = yield model_1.default.find({ car_id: checkCar._id, image_url: imagePathDefault });
            if (checkImageCar.length > 0 && !req.file)
                throw new errors_1.BadRequestError("The image you uploaded already exists");
            const result = yield model_1.default.create({
                car_id: checkCar._id,
                image_url: req.file ? `/images/${req.file.filename}` : imagePathDefault,
            });
            if (!result)
                throw new errors_1.BadRequestError("An error occurred while create data!");
            return (0, car_images_1.toCarImageResponse)(result);
        });
    }
    static getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(car_images_2.CarImageValidations.GETALL, req);
            let condition = {};
            if (request.car_id) {
                condition = Object.assign(Object.assign({}, condition), { car_id: request.car_id });
            }
            if (request.is_primary) {
                condition = Object.assign(Object.assign({}, condition), { is_primary: request.is_primary });
            }
            const result = yield model_1.default.find(condition);
            if (!result)
                throw new errors_1.BadRequestError("An error occurred while get all data!");
            return (0, car_images_1.toCarImageResponses)(result);
        });
    }
    static update(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(car_images_2.CarImageValidations.UPDATE, req);
            const checkCarImage = yield model_1.default.findOne({ _id: id, car_id: request.car_id });
            if (!checkCarImage)
                throw new errors_1.NotfoundError("Car image not found!");
            if (checkCarImage && checkCarImage.is_primary === true)
                throw new errors_1.BadRequestError("No changes were made. The image is already marked as primary.");
            const checkCarImagePrimary = yield model_1.default.findOne({ car_id: request.car_id, is_primary: true });
            if (checkCarImagePrimary)
                yield model_1.default.findByIdAndUpdate({ _id: checkCarImagePrimary._id }, { is_primary: false }, { new: true, runValidators: true });
            const result = yield model_1.default.findByIdAndUpdate({ _id: id }, { is_primary: true }, { new: true, runValidators: true });
            if (!result)
                throw new errors_1.BadRequestError("An error occurred while update data!");
            return (0, car_images_1.toCarImageResponse)(result);
        });
    }
    static delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(car_images_2.CarImageValidations.DELETE, req);
            const result = yield model_1.default.findById({ _id: request.id });
            if (!result)
                throw new errors_1.NotfoundError("Car image not found!");
            const pathImage = path_1.default.join("public", result.image_url);
            if (imagePathDefault !== result.image_url) {
                yield fs_1.default.promises.unlink(pathImage);
            }
            yield model_1.default.findByIdAndDelete({ _id: result._id });
            return (0, car_images_1.toCarImageResponse)(result);
        });
    }
    static deleteMany(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = validation_1.Validation.validate(car_images_2.CarImageValidations.DELETEMANY, req);
            const result = yield model_1.default.find({ car_id: request.car_id });
            if (!result || result.length === 0)
                return [];
            yield Promise.all(result.map((image) => __awaiter(this, void 0, void 0, function* () {
                if (image.image_url !== imagePathDefault) {
                    const imagePath = path_1.default.join("public", image.image_url);
                    try {
                        yield fs_1.default.promises.unlink(imagePath);
                    }
                    catch (err) {
                        console.error(`Failed to delete Image ${image.image_url}: `, err);
                    }
                }
            })));
            yield model_1.default.deleteMany({ car_id: request.car_id });
            return (0, car_images_1.toCarImageResponses)(result);
        });
    }
}
exports.CarImageServices = CarImageServices;
