import { NextFunction, Request, Response } from "express";
import { UserServices } from "../../../../services/mongoose/users";
import { UserGetAllRequest, UserSigninRequest, UserSignUpRequest, UserUpdateRequest } from "./types";
import { StatusCodes } from "http-status-codes";
import { RequestCustom } from "../../../../types/express";
import { userToken } from "../../../../types/token-user";

export class UserControllers {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const requestBody: UserSignUpRequest = req.body as UserSignUpRequest;
      const result = await UserServices.signUp(requestBody);

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Signup successfully",
        data: result,
        total: 1,
      });
    } catch (err) {
      next(err);
    }
  }

  static async signIn(req: Request, res: Response, next: NextFunction) {
    try {
        const requestBody: UserSigninRequest = req.body as UserSigninRequest
        const result = await UserServices.signIn(requestBody)

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Signin successfully",
            data: result,
            total: 1
        })
    } catch (err) {
        next(err)
    }
  }
  
  static async getAll(req: RequestCustom, res: Response, next: NextFunction) {
    try {
        const requestQuery: UserGetAllRequest = req.query as UserGetAllRequest
        const result = await UserServices.getAll(requestQuery)

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Data user retrieved successfully",
            data: result,
            total: result.length,
        })
    } catch (err) {
        next(err)
    }
  }

  static async getOne(req: RequestCustom, res: Response, next: NextFunction) {
    try {
        const requestUser: userToken = req.user as userToken
        const result = await UserServices.getOne(requestUser._id)

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Data user retrieved successfully",
            data: result,
            total: 1,
        })
    } catch (err) {
        next(err)
    }
  }

  static async update(req: RequestCustom, res: Response, next: NextFunction) {
    try {
        const requestUser: userToken = req.user as userToken
        const requestBody: UserUpdateRequest = req.body as UserUpdateRequest

        const result = await UserServices.update(requestUser, requestBody)
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Update data user successfully",
            data: result,
            total: 1,
        })
    } catch (err) {
        next(err)
    }
  }
}
