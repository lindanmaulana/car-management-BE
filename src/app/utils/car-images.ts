import { CarImageDocumentResult, CarImageDocumentResults, CarImageResponse } from "../api/v1/car_images/types";

export const toCarImageResponse = (data: CarImageDocumentResult): CarImageResponse => {
    return {
        _id: data._id,
        car_id: data.car_id,
        image_url: data.image_url,
        is_primary: data.is_primary,
        created_at: data.created_at,
        updated_at: data.updated_at,
        __v: data.__v
    }
}

export const toCarImageResponses = (data: CarImageDocumentResults): CarImageResponse[] => {
    return data.map(carImage => ({
        _id: carImage._id,
        car_id: carImage.car_id,
        image_url: carImage.image_url,
        is_primary: carImage.is_primary,
        created_at: carImage.created_at,
        updated_at: carImage.updated_at,
        __v: carImage.__v
    }))
}