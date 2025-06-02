import { NextFunction, Response } from "express";
import { RequestCustom } from "../../../../types/express";
import { CarCreateRequest, CarDeleteRequest, CarGetAllRequest, CarGetOneRequest, CarUpdateRequest } from "./types";
import { CarServices } from "../../../../services/mongoose/cars";
import { StatusCodes } from "http-status-codes";

export class CarController {
    static async create(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const request: CarCreateRequest = req.body as CarCreateRequest
            const result = await CarServices.create(request)

            res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Car created successfully",
                data: result,
                total: 1,
            })
        } catch (err) {
            next(err)
        }
    }

    static async getAll(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const requestQuery: CarGetAllRequest = req.query as CarGetAllRequest
            const result = await CarServices.getALl(requestQuery)

            res.status(StatusCodes.OK).json({
                success: true,
                message: "Data car retrieved successfully",
                data: result,
                total: result.length,
            })
        } catch (err) {
            next(err)
        }
    }

    static async getOne(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const requestParams: CarGetOneRequest = {id: req.params.id}
            const result = await CarServices.getOne(requestParams)

            res.status(StatusCodes.OK).json({
                success: true,
                message: "Data car retrieved successfully",
                data: result,
                total: 1
            })
        } catch (err) {
            next(err)
        }
    }

    static async update(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const requestParams = {id: req.params.id}
            const requestBody: CarUpdateRequest = req.body as CarUpdateRequest
            const result = await CarServices.update(requestParams.id, requestBody)

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
            const requestParams: CarDeleteRequest = {id: req.params.id}
            const result = await CarServices.delete(requestParams)

            res.status(StatusCodes.OK).json({
                success: true,
                message: "Delete car data successfully",
                data: result,
                total: 1
            })
        } catch (err) {
            next(err)
        }
    }
}