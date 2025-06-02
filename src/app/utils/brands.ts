import { BrandDocumentResult, BrandResponse } from "../api/v1/brands/types"

export const toBrandResponse = (data: BrandDocumentResult): BrandResponse => {
    return {
        _id: data._id,
        name: data.name,
        country: data.country,
        created_at: data.created_at,
        updated_at: data.updated_at,
        __v: data.__v
    }
}

export const toBrandResponses = (data: BrandResponse[]): BrandResponse[] => {
    return data
}