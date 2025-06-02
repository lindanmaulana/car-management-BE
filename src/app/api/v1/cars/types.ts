import { HydratedDocument, Types } from "mongoose";
import { CarImageResponse } from "../car_images/types";
import { CarDetailCreateRequest } from "../car_details/types";

enum CARSTATUS {
    available,
    rented,
    sold
}

export interface CarSchema {
    name: string
    brand_id: Types.ObjectId
    model: string
    status: string
    price: number
    thumbnail: string
    created_at: Date
    updated_at: Date
}

export type CarSchemaResponse = Omit<CarSchema, "brand_id"> & {
    brand_id: {
        _id: Types.ObjectId
        name: string
        country: string
    },
    images?: CarImageResponse[]
}

export type CarDocumentResult = HydratedDocument<CarSchemaResponse>
export type CarDocumentResults = HydratedDocument<CarSchemaResponse>[]

export interface CarResponse {
    _id: Types.ObjectId
    name: string
    brand_id: {
        _id: Types.ObjectId,
        name: string
        country: string
    },
    model: string
    status: string
    price: number
    thumbnail: string
    images?: CarImageResponse[]
    created_at: Date
    updated_at: Date
    __v: number
}

export interface CarCreateRequest extends CarDetailCreateRequest {
    name: string
    brand_id: string
    model: string
    price: string
    thumbnail: string
}

export interface CarGetAllRequest {
    keyword?: string
    brand?: string
}

export interface CarGetAllCondition {
    name?: {$regex: RegExp},
    brand_id: string
}

export interface CarGetOneRequest {
    id: string
}

export interface CarUpdateRequest {
    name?: string
    brand_id?: string
    model?: string
    status?: string
    price?: string
    thumbnail?: string
}

export interface CarDeleteRequest {
    id: string
}