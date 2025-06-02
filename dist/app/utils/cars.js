"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCarResponses = exports.toCarResponse = void 0;
const toCarResponse = (data) => {
    return {
        _id: data._id,
        name: data.name,
        brand_id: {
            _id: data.brand_id._id,
            name: data.brand_id.name,
            country: data.brand_id.country
        },
        images: data.images,
        model: data.model,
        status: data.status,
        price: data.price,
        thumbnail: data.thumbnail,
        created_at: data.created_at,
        updated_at: data.updated_at,
        __v: data.__v
    };
};
exports.toCarResponse = toCarResponse;
const toCarResponses = (data) => {
    return data.map(car => ({
        _id: car._id,
        name: car.name,
        brand_id: {
            _id: car.brand_id._id,
            name: car.brand_id.name,
            country: car.brand_id.country
        },
        images: car.images,
        model: car.model,
        status: car.status,
        price: car.price,
        thumbnail: car.thumbnail,
        created_at: car.created_at,
        updated_at: car.updated_at,
        __v: car.__v
    }));
};
exports.toCarResponses = toCarResponses;
