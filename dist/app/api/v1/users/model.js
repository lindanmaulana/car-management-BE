"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const UserSchema = new Schema({
    name: {
        type: String,
        minLength: [3, "Name min 3 character"],
        maxLength: [50, "Name max 50 character"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 8,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, {
    timestamps: true
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            user.password = yield bcrypt_1.default.hash(user.password, 10);
        }
        next();
    });
});
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.password)
            throw new Error("Password is not set on this user instance");
        const isMatch = yield bcrypt_1.default.compare(candidatePassword, this.password);
        return isMatch;
    });
};
const User = model("User", UserSchema);
exports.default = User;
