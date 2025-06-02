import { z, ZodType } from "zod";

export class UserValidations {
    static readonly SIGINUP: ZodType = z.object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
    })

    static readonly SIGNIN: ZodType = z.object({
        email: z.string().email(),
        password: z.string()
    })

    static readonly GETALL: ZodType = z.object({
        keyword: z.string().min(1).optional()
    })

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).optional(),
        password: z.string().min(8).optional(),
        confirmPassword: z.string().min(8).optional()
    })

}