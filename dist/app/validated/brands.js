"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandValidations = void 0;
const zod_1 = require("zod");
class BrandValidations {
}
exports.BrandValidations = BrandValidations;
BrandValidations.CREATE = zod_1.z.object({
    name: zod_1.z.string(),
    country: zod_1.z.string()
});
BrandValidations.GETALL = zod_1.z.object({
    keyword: zod_1.z.string().min(1).optional(),
    country: zod_1.z.string().min(1).optional()
});
BrandValidations.GETONE = zod_1.z.object({
    id: zod_1.z.string().min(1)
});
BrandValidations.UPDATE = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    country: zod_1.z.string().min(1).optional()
});
BrandValidations.DELETE = zod_1.z.object({
    id: zod_1.z.string()
});
