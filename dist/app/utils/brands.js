"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBrandResponses = exports.toBrandResponse = void 0;
const toBrandResponse = (data) => {
    return {
        _id: data._id,
        name: data.name,
        country: data.country,
        created_at: data.created_at,
        updated_at: data.updated_at,
        __v: data.__v
    };
};
exports.toBrandResponse = toBrandResponse;
const toBrandResponses = (data) => {
    return data;
};
exports.toBrandResponses = toBrandResponses;
