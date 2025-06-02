import { z, ZodType } from "zod";

export class CarImageValidations {
    static readonly GETALL: ZodType = z.object({
        car_id: z.string().min(1).optional(),
        is_primary: z.string().min(1).optional()
    })

    static readonly UPDATE: ZodType = z.object({
        car_id: z.string().optional()
    })

    static readonly DELETE: ZodType = z.object({
        id: z.string().min(1)
    })

    static readonly DELETEMANY: ZodType = z.object({
        car_id: z.string().min(1)
    })
}