import { UserResponse } from "../api/v1/users/types";

export const toUserResponse = (data: UserResponse): UserResponse => {
    return {
        _id: data._id,
        name: data.name,
        role: data.role,
        created_at: data.created_at,
        updated_at: data.updated_at,
        __v: data.__v
    }
}

export const toUserResponses = (data: UserResponse[]): UserResponse[] => {
    return data.map(user => ({
        _id: user._id,
        name: user.name,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    }))
}