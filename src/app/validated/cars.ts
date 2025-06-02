import { z, ZodType } from "zod";

export class CarValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1),
        brand_id: z.string().min(1),
        model: z.string().min(1),
        price: z.preprocess((val) => Number(val), z.number().positive()),
        thumbnail: z.string().optional()
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