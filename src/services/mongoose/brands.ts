import Brands from "../../app/api/v1/brands/model";
import { BrandCreateRequest, BrandDeleteRequest, BrandDocumentResult, BrandGetAllCondition, BrandGetAllRequest, BrandGetOneRequest, BrandResponse, BrandUpdateRequest } from "../../app/api/v1/brands/types";
import Cars from "../../app/api/v1/cars/model";
import { BadRequestError, NotfoundError } from "../../app/errors";
import { toBrandResponse, toBrandResponses } from "../../app/utils/brands";
import { BrandValidations } from "../../app/validated/brands";
import { Validation } from "../../app/validated/validation";

export class BrandServices {
    static async create(req: BrandCreateRequest): Promise<BrandResponse> {
        const request = Validation.validate(BrandValidations.CREATE, req)

        const check = await Brands.findOne({name: request.name, country: request.country})
        if(check) throw new BadRequestError("The brand is already registered")

        const result = await Brands.create({name: request.name, country: request.country}) as BrandDocumentResult
        if(!result) throw new BadRequestError("An error occurred while saving data")

        return toBrandResponse(result)
    }

    static async getAll(req: BrandGetAllRequest): Promise<BrandResponse[]> {
        const request = Validation.validate(BrandValidations.GETALL, req)
        
        let condition: Partial<BrandGetAllCondition> = {}

        if(request.keyword) {
            condition = {
                ...condition,
                name: {$regex: new RegExp(request.keyword, "i")}
            }
        }

        if(request.country) {
            condition = {
                ...condition,
                country: request.country
            }
        }

        const result = await Brands.find(condition)

        return toBrandResponses(result)
    }

    static async getOne(req: BrandGetOneRequest): Promise<BrandResponse> {
        const request = Validation.validate(BrandValidations.GETONE, req)

        const result = await Brands.findById({_id: request.id})
        if(!result) throw new NotfoundError("Brand not found")

        return toBrandResponse(result)
    }

    static async update(id: string, req: BrandUpdateRequest): Promise<BrandUpdateRequest> {
        const request = Validation.validate(BrandValidations.UPDATE, req)

        let condition: Partial<BrandUpdateRequest> = {}

        await BrandServices.checkingBrand(id)

        if(request.name) {
            const checkingDuplicated = await Brands.findOne({name: request.name,_id: {$ne: id}})
            if(checkingDuplicated) throw new BadRequestError("Brand name is already exist")

            condition = {
                ...condition,
                name: request.name
            }
        }   

        if(request.country) {
            condition = {
                ...condition,
                country: request.country
            }
        }

        const result = await Brands.findByIdAndUpdate({_id: id}, {$set: condition}, {new: true, runValidators: true})
        if(!result) throw new BadRequestError("An error occurred while changing data")

        return toBrandResponse(result)
    }

    static async delete(req: BrandDeleteRequest): Promise<BrandResponse> {
        const request = Validation.validate(BrandValidations.DELETE, req)

        const result = await Brands.findById({_id: request.id})
        if(!result) throw new NotfoundError("Brand not found!")

        await Brands.findByIdAndDelete({_id: request.id})
        await Cars.deleteMany({brand_id: request.id})

        return toBrandResponse(result)
    }

    static async checkingBrand(id: string): Promise<BrandResponse> {
        const result = await Brands.findById({_id: id})

        if(!result) throw new NotfoundError("Brand not found!")

        return toBrandResponse(result)
    }
}