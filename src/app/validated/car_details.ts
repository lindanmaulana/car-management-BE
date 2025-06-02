import { z, ZodType } from "zod";
import { FUEL_TYPE, TRANSMISSION } from "../api/v1/car_details/types";

const transmission: TRANSMISSION[] = [TRANSMISSION.MANUAL, TRANSMISSION.AUTOMATIC]

export class CarDetailValidations {
    static readonly CREATE: ZodType = z.object({
        car_id: z.string().min(1),
        year: z.string().min(1),
        transmission: z.enum([TRANSMISSION.MANUAL, TRANSMISSION.AUTOMATIC]),
        fuel_type: z.enum([FUEL_TYPE.BENSIN, FUEL_TYPE.SOLAR, FUEL_TYPE.LISTRIK, FUEL_TYPE.HYBRID]),
        plate_number: z.string().min(6),
        mileage: z.number().min(1),
        color: z.string().min(1),
        description: z.string().min(1)
    })
}