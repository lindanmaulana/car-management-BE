import { NextFunction, Response } from "express";
import { UnauthenticatedError } from "../app/errors/unauthenticated";
import { RequestCustom } from "../types/express";
import { userToken } from "../types/token-user";
import createJwt from "../utils/create-jwt";

const authenticatedUser = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        const authHeader = req.headers.authorization
        if(authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(' ')[1]
        }

        if(!token) throw new UnauthenticatedError("Authenticated invalid")

        const payload: userToken = createJwt.isTokenValid({token}) as userToken

        req.user = {
            _id: payload._id,
            name: payload.name,
            role: payload.role
        }
        
        next()
    } catch (err) {
        next(err)
    }
}

const authorizedRoles = (...roles: string[]) => {
    return (req: RequestCustom, res: Response, next: NextFunction) => {
        if(!roles.includes(req.user!.role)) {
            throw new UnauthenticatedError("Unauthorized to access this route")
        }


        next()
    }
}

export default {
    authenticatedUser,
    authorizedRoles
}