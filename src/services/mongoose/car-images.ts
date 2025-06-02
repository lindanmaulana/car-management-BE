import fs from "fs";
import path from "path";
import CarImage from "../../app/api/v1/car_images/model";
import { CarImageDeleteManyRequest, CarImageDeleteRequest, CarImageDocumentResults, CarImageGetAllRequest, CarImageResponse, CarImageUpdateRequest } from "../../app/api/v1/car_images/types";
import { BadRequestError, NotfoundError } from "../../app/errors";
import { toCarImageResponse, toCarImageResponses } from "../../app/utils/car-images";
import { CarImageValidations } from "../../app/validated/car-images";
import { Validation } from "../../app/validated/validation";
import { RequestCustom } from "../../types/express";
import { CarServices } from "./cars";

const imagePathDefault = "/images/default-car.svg"

export class CarImageServices {
    static async create(req: RequestCustom, id: string): Promise<CarImageResponse> {
        const checkCar = await CarServices.checkingCar(id)

        const checkImageCar = await CarImage.find({car_id: checkCar._id, image_url: imagePathDefault})
        if(checkImageCar.length > 0 && !req.file) throw new BadRequestError("The image you uploaded already exists")

        const result = await CarImage.create({
            car_id: checkCar._id, 
            image_url: req.file ? `/images/${req.file.filename}` : imagePathDefault,
        })

        if(!result) throw new BadRequestError("An error occurred while create data!")

        return toCarImageResponse(result)
    }

    static async getAll(req: CarImageGetAllRequest): Promise<CarImageResponse[]> {
        const request = Validation.validate(CarImageValidations.GETALL, req)

        let condition: Partial<CarImageGetAllRequest> = {}

        if(request.car_id) {
            condition = {
                ...condition,
                car_id: request.car_id
            }
        }

        if(request.is_primary) {
            condition = {
                ...condition,
                is_primary: request.is_primary
            }
        }

        const result = await CarImage.find(condition)
        if(!result) throw new BadRequestError("An error occurred while get all data!")

        return toCarImageResponses(result)
    }

    static async update(id: string, req: CarImageUpdateRequest): Promise<CarImageResponse> {
        const request = Validation.validate(CarImageValidations.UPDATE, req)

        const checkCarImage = await CarImage.findOne({_id: id, car_id: request.car_id})

        if(!checkCarImage) throw new NotfoundError("Car image not found!")
        if(checkCarImage && checkCarImage.is_primary === true) throw new BadRequestError("No changes were made. The image is already marked as primary.")

        const checkCarImagePrimary = await CarImage.findOne({car_id: request.car_id, is_primary: true})
        if(checkCarImagePrimary) await CarImage.findByIdAndUpdate({_id: checkCarImagePrimary._id}, {is_primary: false}, {new: true, runValidators: true})

        const result = await CarImage.findByIdAndUpdate({_id: id}, {is_primary: true}, {new: true, runValidators: true})
        if(!result) throw new BadRequestError("An error occurred while update data!")

        return toCarImageResponse(result)
    }

    static async delete(req: CarImageDeleteRequest): Promise<CarImageResponse> {
        const request = Validation.validate(CarImageValidations.DELETE, req)

        const result = await CarImage.findById({_id: request.id})
        if(!result) throw new NotfoundError("Car image not found!")

        const pathImage = path.join("public", result.image_url)

        if(imagePathDefault !== result.image_url) {
            await fs.promises.unlink(pathImage)
        }

        await CarImage.findByIdAndDelete({_id: result._id}) as CarImageDeleteRequest

        return toCarImageResponse(result)
    }

    static async deleteMany(req: CarImageDeleteManyRequest): Promise<CarImageResponse[]> {
        const request = Validation.validate(CarImageValidations.DELETEMANY, req)

        const result = await CarImage.find({car_id: request.car_id}) as CarImageDocumentResults
        if(!result || result.length === 0) return []

        await Promise.all(
            result.map(async (image) => {
                
                if(image.image_url !== imagePathDefault) {
                    const imagePath = path.join("public", image.image_url)
                    try {
                        await fs.promises.unlink(imagePath)

                    } catch (err) {
                        console.error(`Failed to delete Image ${image.image_url}: `, err)
                    }
                }
            })
        )

        await CarImage.deleteMany({car_id: request.car_id})

        return toCarImageResponses(result)
    }
}