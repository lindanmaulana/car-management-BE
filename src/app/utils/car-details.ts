import { CarDetailDocumentResult, CarDetailResponse, FUEL_TYPE, TRANSMISSION } from "../api/v1/car_details/types";

export const toCarDetailResponse = (data: CarDetailDocumentResult): CarDetailResponse => {
    return {
        _id: data._id,
        car_id: data.car_id,
        year: data.year,
        transmission: data.transmission as TRANSMISSION,
        fuel_type: data.fuel_type as FUEL_TYPE,
        plate_number: data.plate_number,
        mileage: data.mileage,
        color: data.color,
        description: data.description,
        created_at: data.created_at,
        updated_at: data.updated_at,
        __v: data.__v
    }
}