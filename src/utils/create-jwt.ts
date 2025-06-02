import jwt from "jsonwebtoken"
import { userToken } from "../types/token-user";
import { UnauthenticatedError } from "../app/errors/unauthenticated";
import envConfig from "../config/env.config";

interface createJwtParams {
    payload: userToken
}

const createJwt = ({payload}: createJwtParams): string => {
    const token = jwt.sign(payload, envConfig.JWTSECRETKEY, {
        expiresIn: "24h"
    })


    return token
}

const isTokenValid = (({token}: {token: string}) => {
    if(!envConfig.JWTSECRETKEY) throw new Error("JWT secret key is not defined")

        try {
            const isValid = jwt.verify(token, envConfig.JWTSECRETKEY) as userToken
            
            return isValid
        } catch (err) {
            let errorMessage = "An unexpected error occurred"

            if(err instanceof jwt.JsonWebTokenError) {
                errorMessage = `Token Error : ${err.message}`
            }

            if(err instanceof jwt.TokenExpiredError) {
                errorMessage = `Token expired : ${err.message}`
            }

            if(err instanceof jwt.NotBeforeError) {
                errorMessage = `Token not active : ${err.message}`
            }

            if(err instanceof Error) {
                errorMessage = err.message
            }

            throw new UnauthenticatedError(errorMessage)
        }
})

export default {
    createJwt,
    isTokenValid
}