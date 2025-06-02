import { z, ZodType } from "zod";
import { FUEL_TYPE, TRANSMISSION } from "../api/v1/car_details/types";

export class CarValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1),
        brand_id: z.string().min(1),
        model: z.string().min(1),
        price: z.preprocess((val) => Number(val), z.number().positive()),
        thumbnail: z.string().optional(),

        year: z.string().min(1),
        transmission: z.enum([TRANSMISSION.MANUAL, TRANSMISSION.AUTOMATIC]),
        fuel_type: z.enum([FUEL_TYPE.BENSIN, FUEL_TYPE.SOLAR, FUEL_TYPE.LISTRIK, FUEL_TYPE.HYBRID]),
        plate_number: z.string().min(6),
        mileage: z.number().min(1),
        color: z.string().min(1),
        description: z.string().min(1)
    })

    static readonly GETALL: ZodType = z.object({
        keyword: z.string().min(1).optional(),
        brand: z.string().min(1).optional()
    })

    static readonly GETONE: ZodType = z.object({
        id: z.string().min(1)
    })

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).optional(),
        bran_id: z.string().min(1).optional(),
        model: z.string().min(1).optional(),
        status:z.enum(["available", "rented", "sold"]).optional(),
        price: z.preprocess((val) => Number(val), z.number().positive()).optional(),
        thumbnail: z.string().min(1).optional()
    })

    static readonly DELETE: ZodType = z.object({
        id: z.string().min(1)
    })
}