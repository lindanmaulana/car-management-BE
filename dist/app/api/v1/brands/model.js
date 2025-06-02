"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const BrandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Brands = model("Brand", BrandSchema);
exports.default = Brands;
