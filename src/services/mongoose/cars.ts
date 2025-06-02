import Cars from "../../app/api/v1/cars/model";

import { BrandServices } from "./brands";

import CarImage from "../../app/api/v1/car_images/model";
import { CarCreateRequest, CarDeleteRequest, CarDocumentResult, CarDocumentResults, CarGetAllCondition, CarGetAllRequest, CarGetOneRequest, CarResponse, CarUpdateRequest } from "../../app/api/v1/cars/types";
import { BadRequestError, NotfoundError } from "../../app/errors";
import { toCarResponse, toCarResponses } from "../../app/utils/cars";
import { CarValidation } from "../../app/validated/cars";
import { Validation } from "../../app/validated/validation";
import { CarImageServices } from "./car-images";
import mongoose from "mongoose";

export class CarServices {
    static async create(req: CarCreateRequest): Promise<CarResponse> {
        const request = Validation.validate(CarValidation.CREATE, req)
        await BrandServices.checkingBrand(request.brand_id)

        const checkCarDuplicate = await Cars.findOne({name: request.name ,model: request.model, brand_id: request.brand_id})
        if(checkCarDuplicate) throw new BadRequestError("Car is already exist!")

        const result = (await Cars.create(request))
        if(!result) throw new BadRequestError("An error occurred while saving data")

        const resultWithBrand = await Cars.findById({_id: result._id}).populate({
            path: "brand_id",
            select: "_id name country"
        }) as unknown as CarDocumentResult

        return toCarResponse(resultWithBrand)
    }

    static async getALl(req: CarGetAllRequest): Promise<CarResponse[]> {
        const request = Validation.validate(CarValidation.GETALL, req)
        
        let condition: Partial<CarGetAllCondition> = {}

        if(request.keyword) {
            condition = {
                ...condition,
                name: {$regex:  new RegExp(request.keyword, "i")}
            }
        }

        if(request.brand) {
            await BrandServices.checkingBrand(request.brand)

            condition = {
                ...condition,
                brand_id: request.brand
            }
        }

        const result = await Cars.aggregate([
            {
                $match: condition
            },
            {
                $lookup: {
                    from: "car_images",
                    localField: "_id",
                    foreignField: "car_id",
                    as: "images"
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    as: "brand_id"
                }
            },
            {
                $unwind: {
                    path: "$brand_id",
                    preserveNullAndEmptyArrays: true
                }
            }
        ])

        return toCarResponses(result)
    }

    static async getOne(req: CarGetOneRequest): Promise<CarResponse> {
        const request = Validation.validate(CarValidation.GETONE, req)

        const result = await Cars.aggregate([
            {
                $match: {
                     _id: new mongoose.Types.ObjectId(request.id)
                }
            },
            {
                $lookup: {
                    from: "car_images",
                    localField: "_id",
                    foreignField: "car_id",
                    as: "images"
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    as: "brand_id"
                }
            },
            {
                $unwind: {
                    path: "$brand_id",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]) as unknown as CarDocumentResults

        return toCarResponse(result[0])
    }

    static async update(id: string, req: CarUpdateRequest): Promise<CarResponse> {
        const request = Validation.validate(CarValidation.UPDATE, req)

        let condition: Partial<CarUpdateRequest> = {}

        const checkCar = await Cars.findById({_id: id})
        if(!checkCar) throw new NotfoundError("Car not found!")

        if(request.name) {
            condition = {
                ...condition,
                name: request.name
            }
        }

        if(request.brand_id) {
            await BrandServices.checkingBrand(request.brand_id)

            condition = {
                ...condition,
                brand_id: request.brand_id
            }
        }

        if(request.model) {
            condition = {
                ...condition,
                model: request.model
            }
        }

        if(request.status) {
            if(checkCar.status === request.status) throw new BadRequestError("All data is up to date, no changes need to be saved.")
            
                condition = {
                    ...condition,
                    status: request.status
                }
        }

        if(request.price) {
            condition = {
                ...condition,
                price: request.price
            }
        }

        if(request.thumbnail) {
            condition = {
                ...condition,
                thumbnail: request.thumbnail
            }
        }

        const result = await Cars.findByIdAndUpdate({_id: id}, {$set: condition}, {new: true, runValidators: true})
        if(!result) throw new BadRequestError("An error occurred while update data!")

        const resultUpdate = await Cars.findById({_id: result._id}).populate({
            path: "brand_id",
            select: "_id name country"
        }) as unknown as CarDocumentResult
        
        return toCarResponse(resultUpdate)
    }


    static async delete(req: CarDeleteRequest): Promise<CarResponse> {
        const request = Validation.validate(CarValidation.DELETE, req)

        const result = await Cars.findById({_id: request.id}) as CarDocumentResult
        if(!result) throw new NotfoundError("Car not found!")

        const resultCarImage = await CarImage.find({car_id: result._id})
        const carIdStr: string = result._id.toString()
        
        if(resultCarImage.length > 0) {
            await CarImageServices.deleteMany({car_id: carIdStr})
        }
        
        await Cars.findByIdAndDelete({_id: result.id})

        return toCarResponse(result)
    }

    static async checkingCar(id: string): Promise<CarResponse> {
        const result = await Cars.findById({_id: id}) as CarDocumentResult
        if(!result) throw new NotfoundError("Car not found!")

        return toCarResponse(result)
    }
}