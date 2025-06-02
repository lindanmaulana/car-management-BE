"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidation = void 0;
const zod_1 = require("zod");
class CarValidation {
}
exports.CarValidation = CarValidation;
CarValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1),
    brand_id: zod_1.z.string().min(1),
    model: zod_1.z.string().min(1),
    price: zod_1.z.preprocess((val) => Number(val), zod_1.z.number().positive()),
    thumbnail: zod_1.z.string().optional()
});
CarValidation.GETALL = zod_1.z.object({
    keyword: zod_1.z.string().min(1).optional(),
    brand: zod_1.z.string().min(1).optional()
});
CarValidation.GETONE = zod_1.z.object({
    id: zod_1.z.string().min(1)
});
CarValidation.UPDATE = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    bran_id: zod_1.z.string().min(1).optional(),
    model: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(["available", "rented", "sold"]).optional(),
    price: zod_1.z.preprocess((val) => Number(val), zod_1.z.number().positive()).optional(),
    thumbnail: zod_1.z.string().min(1).optional()
});
CarValidation.DELETE = zod_1.z.object({
    id: zod_1.z.string().min(1)
});
