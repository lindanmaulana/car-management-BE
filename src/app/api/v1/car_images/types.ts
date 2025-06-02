import { HydratedDocument, Types } from "mongoose"

export interface CarImageSchema {
    car_id: Types.ObjectId
    image_url: string
    is_primary: boolean
    created_at: Date
    updated_at: Date
}

export type CarImageDocumentResult = HydratedDocument<CarImageSchema>
export type CarImageDocumentResults = HydratedDocument<CarImageSchema>[]

export interface CarImageResponse {
    _id: Types.ObjectId
    car_id: Types.ObjectId
    image_url: string
    is_primary: boolean
    created_at: Date
    updated_at: Date
    __v: number
}

export interface CarImageCreateRequest {
    id: string
}

export interface CarImageGetAllRequest {
    car_id?: string
    is_primary?: string
}

export interface CarImageUpdateRequest {
    car_id?: string
}

export interface CarImageDeleteRequest {
    id: string
}

export interface CarImageDeleteManyRequest {
    car_id: string
}