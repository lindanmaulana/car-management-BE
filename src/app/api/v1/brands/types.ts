import { HydratedDocument, Types } from "mongoose"

export interface BrandSchema {
    name: string
    country: string
    created_at: Date
    updated_at: Date
}

export type BrandDocumentResult = HydratedDocument<BrandSchema>

export interface BrandResponse {
    _id: Types.ObjectId
    name: string
    country: string
    created_at: Date
    updated_at: Date
    __v: number
}

export interface BrandCreateRequest {
    name: string
    country: string
}

export interface BrandGetAllRequest {
    keyword?: string
    country?: string
}

export  interface BrandGetAllCondition {
    name?: {$regex: RegExp}
    country?: string
}

export interface BrandGetOneRequest {
    id: string
}

export interface BrandUpdateRequest {
    name?: string
    country?: string
}

export interface BrandDeleteRequest {
    id: string
}