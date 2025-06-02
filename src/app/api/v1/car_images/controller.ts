import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CarImageServices } from "../../../../services/mongoose/car-images";
import { RequestCustom } from "../../../../types/express";
import { CarImageCreateRequest, CarImageDeleteRequest, CarImageGetAllRequest, CarImageUpdateRequest } from "./types";

export class CarImageController {
    static async create(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const requestParams: CarImageCreateRequest = {id: req.params.id}
            const result = await CarImageServices.create(req, requestParams.id)

            res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Car Image created successfully",
                data: result,
                total: 1,
            })
        } catch (err) {
            next(err)
        }
    }

    static async getAll(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const requestQuery: CarImageGetAllRequest = req.query as CarImageGetAllRequest
            const result = await CarImageServices.getAll(requestQuery)

            res.status(StatusCodes.OK).json({
                success: true,
                message: "Data car image retrieved successfully",
                data: result,
                total: result.length,
            })
        } catch (err) {
            next(err)
        }
    }

    static async update(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const requestParams = {id: req.params.id}
            const requestBody: CarImageUpdateRequest = req.body as CarImageUpdateRequest

            const result = await CarImageServices.update(requestParams.id, requestBody)

            res.status(StatusCodes.OK).json({
                success: true,
                message: "Data's car update was successful",
                data: result,
                total: 1
            })
        } catch (err) {
            next(err)
        }
    }

    static async delete(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const requestParams: CarImageDeleteRequest = {id: req.params.id}
            const result = await CarImageServices.delete(requestParams)

            res.status(StatusCodes.OK).json({
                success: true,
                message: "Delete car image data successfully",
                data: result,
                total: 1
            })
        } catch (err) {
            next(err)
        }
    }
}