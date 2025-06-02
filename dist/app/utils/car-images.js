"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCarImageResponses = exports.toCarImageResponse = void 0;
const toCarImageResponse = (data) => {
    return {
        _id: data._id,
        car_id: data.car_id,
        image_url: data.image_url,
        is_primary: data.is_primary,
        created_at: data.created_at,
        updated_at: data.updated_at,
        __v: data.__v
    };
};
exports.toCarImageResponse = toCarImageResponse;
const toCarImageResponses = (data) => {
    return data.map(carImage => ({
        _id: carImage._id,
        car_id: carImage.car_id,
        image_url: carImage.image_url,
        is_primary: carImage.is_primary,
        created_at: carImage.created_at,
        updated_at: carImage.updated_at,
        __v: carImage.__v
    }));
};
exports.toCarImageResponses = toCarImageResponses;
