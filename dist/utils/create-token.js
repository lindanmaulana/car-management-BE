"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const createToken = (data) => {
    return {
        _id: data._id,
        name: data.name,
        role: data.role
    };
};
exports.createToken = createToken;
