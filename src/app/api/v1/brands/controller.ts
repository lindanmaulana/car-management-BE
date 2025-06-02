import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BrandServices } from "../../../../services/mongoose/brands";
import { RequestCustom } from "../../../../types/express";
import { BrandCreateRequest, BrandGetAllRequest, BrandGetOneRequest, BrandUpdateRequest } from "./types";

export class BrandControllers {
    static async create(req: RequestCustom, res: Response, next: NextFunction) {
        try {   
            const requestBody: BrandCreateRequest = req.body as BrandCreateRequest
            const result = await BrandServices.create(requestBody)

            res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Successfully created brand data",
                data: result,
                total: 1,
            })
        } catch (err) {
            next(err)
        }
    }

    static async getAll(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const requestQuery: BrandGetAllRequest = req.query as BrandGetAllRequest
            const result = await BrandServices.getAll(requestQuery)

            res.status(StatusCodes.OK).json({
                success: true,
                message: "Brand data successfully retrieved",
                data: result,
                total: result.length,
            })
        } catch (err) {
            next(err)
        }
    }

    static async getOne(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const requestParams: BrandGetOneRequest = {id: req.params.id} as BrandGetOneRequest
            const result = await BrandServices.getOne(requestParams)

            res.status(StatusCodes.OK).json({
                success: true,
                message: "Brand data successfully retrieved",
                data: result,
                total: 1,
            })
        } catch (err) {
            next(err)
        }
    }

    static async update(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const requestParams = {id: req.params.id}
            const request: BrandUpdateRequest = req.body as BrandUpdateRequest
            const result = await BrandServices.update(requestParams.id, request)

            res.status(StatusCodes.OK).json({
                success: true,
                message: "Data's brand update was successful",
                data: result,
                total: 1,
            })
        } catch (err) {
            next(err)
        }
    }

    static async delete(req: RequestCustom, res: Response, next: NextFunction) {
        try {
            const requestParams = {id: req.params.id}
            const result = await BrandServices.delete(requestParams)

            res.status(StatusCodes.OK).json({
                success: true,
                message: "Delete brand data successfully",
                data: result,
                total: 1,
            })
        } catch (err) {
            next(err)
        }
    }
}