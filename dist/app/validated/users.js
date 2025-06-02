"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
class UserValidations {
}
exports.UserValidations = UserValidations;
UserValidations.SIGINUP = zod_1.z.object({
    name: zod_1.z.string().min(3).max(50),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    confirmPassword: zod_1.z.string().min(8),
});
UserValidations.SIGNIN = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
UserValidations.GETALL = zod_1.z.object({
    keyword: zod_1.z.string().min(1).optional()
});
UserValidations.UPDATE = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    password: zod_1.z.string().min(8).optional(),
    confirmPassword: zod_1.z.string().min(8).optional()
});
