"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarImageValidations = void 0;
const zod_1 = require("zod");
class CarImageValidations {
}
exports.CarImageValidations = CarImageValidations;
CarImageValidations.GETALL = zod_1.z.object({
    car_id: zod_1.z.string().min(1).optional(),
    is_primary: zod_1.z.string().min(1).optional()
});
CarImageValidations.UPDATE = zod_1.z.object({
    car_id: zod_1.z.string().optional()
});
CarImageValidations.DELETE = zod_1.z.object({
    id: zod_1.z.string().min(1)
});
CarImageValidations.DELETEMANY = zod_1.z.object({
    car_id: zod_1.z.string().min(1)
});
