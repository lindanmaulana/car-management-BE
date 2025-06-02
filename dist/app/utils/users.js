"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponses = exports.toUserResponse = void 0;
const toUserResponse = (data) => {
    return {
        _id: data._id,
        name: data.name,
        role: data.role,
        created_at: data.created_at,
        updated_at: data.updated_at,
        __v: data.__v
    };
};
exports.toUserResponse = toUserResponse;
const toUserResponses = (data) => {
    return data.map(user => ({
        _id: user._id,
        name: user.name,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    }));
};
exports.toUserResponses = toUserResponses;
