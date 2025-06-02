import { HydratedDocument, Types } from "mongoose";

export interface CarDetailSchema {
    car_id: Types.ObjectId
    year: number
    transmission: string
    fuel_type: string
    plate_number: string
    mileage: number
    color: string
    description: string
    created_at: Date
    updated_at: Date
}

export type CarDetailDocumentResult = HydratedDocument<CarDetailSchema>
export type CarDetailDocumentResults = HydratedDocument<CarDetailSchema>[]


export enum FUEL_TYPE {
    BENSIN = 'bensin',
    SOLAR = 'solar',
    LISTRIK = 'listrik',
    HYBRID = 'hybrid'
}

export enum TRANSMISSION {
    MANUAL = "manual",
    AUTOMATIC = "automatic"
}

export interface CarDetailResponse {
    _id: Types.ObjectId,
    car_id: Types.ObjectId,
    year: number
    transmission: TRANSMISSION
    fuel_type: FUEL_TYPE
    plate_number: string
    mileage: number
    color: string
    description: string
    created_at: Date
    updated_at: Date
    __v: number
}

export interface CarDetailCreateRequest {
    car_id: Types.ObjectId,
    year: number
    transmission: TRANSMISSION
    fuel_type: FUEL_TYPE
    plate_number: string
    mileage: number
    color: string
    description: string
}