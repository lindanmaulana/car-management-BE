"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const CarSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    model: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "rented", "sold"],
        default: "available"
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    thumbnail: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});
const Cars = model("Car", CarSchema);
exports.default = Cars;
