"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const CarImageSchema = new Schema({
    car_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    is_primary: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const CarImage = model("Car_image", CarImageSchema);
exports.default = CarImage;
