"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = __importDefault(require("../../config/env.config"));
mongoose_1.default.connect(env_config_1.default.URLDB);
const db = mongoose_1.default.connection;
exports.default = db;
