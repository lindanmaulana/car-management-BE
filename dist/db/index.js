"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
if (!config_1.URLDB)
    throw new Error("Connection database fail");
mongoose_1.default.connect(config_1.URLDB);
const db = mongoose_1.default.connection;
exports.default = db;
