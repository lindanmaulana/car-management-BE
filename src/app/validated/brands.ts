import { z, ZodType } from "zod";

export class BrandValidations {
    static readonly CREATE: ZodType = z.object({
        name: z.string(),
        country: z.string()
    })

    static readonly GETALL: ZodType = z.object({
        keyword: z.string().min(1).optional(),
        country: z.string().min(1).optional()
    })

    static readonly GETONE: ZodType = z.object({
        id: z.string().min(1)
    })

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).optional(),
        country: z.string().min(1).optional()
    })

    static readonly DELETE: ZodType = z.object({
        id: z.string()
    })
}