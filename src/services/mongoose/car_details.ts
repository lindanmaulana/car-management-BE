import Cars from "../../app/api/v1/cars/model"
import CarDetails from "../../app/api/v1/car_details/model"

import { CarDetailCreateRequest, CarDetailResponse } from "../../app/api/v1/car_details/types";
import { CarDetailValidations } from "../../app/validated/car_details";
import { Validation } from "../../app/validated/validation";
import { BadRequestError, NotfoundError } from "../../app/errors";
import { toCarDetailResponse } from "../../app/utils/car-details";

export class CarDetailServices {
    static async create(req: CarDetailCreateRequest): Promise<CarDetailResponse> {
        const request = Validation.validate(CarDetailValidations.CREATE, req)

        const checkCar = await Cars.findById({_id: request.car_id})
        if(!checkCar) throw new NotfoundError("Car not found!")

        const checkCarDetailAlreadyExist= await CarDetails.findOne({car_id: request.car_id})
        if(checkCarDetailAlreadyExist) throw new BadRequestError("Car detail already exist")
        
        const result = await CarDetails.create({
            car_id: request.car_id,
            year: request.year,
            transmission: request.transmission,
            fuel_type: request.fuel_type,
            plate_number: request.plate_number,
            mileage: request.mileage,
            color: request.color,
            description: request.description
        })

        return toCarDetailResponse(result)
    }
}