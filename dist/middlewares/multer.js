"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../../public', 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, Math.floor(Math.random() * 99) + "_" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg") {
        cb(null, true);
    }
    else {
        cb(new Error("Unsupported file format"));
    }
};
const uploadMiddleware = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter
});
exports.default = uploadMiddleware;
