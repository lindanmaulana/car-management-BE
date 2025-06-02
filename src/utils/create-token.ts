import { UserResponse } from "../app/api/v1/users/types";
import { userToken } from "../types/token-user";

export const createToken = (data: UserResponse): userToken => {
    return {
        _id: data._id,
        name: data.name,
        role: data.role
    }
}