import type {Document, Types} from "mongoose"
import { userToken } from "../../../../types/token-user"

export interface UserSchema extends Document {
    name: string
    email: string
    password: string
    role: "admin" | "user"
}

export interface UserMethods {
    comparePassword(candidatePassword: string): Promise<boolean>
}

export type UserDocumentResult = Document & UserSchema & UserMethods 

export interface UserResponse {
    _id: Types.ObjectId
    name: string
    email?: string
    role: string
    created_at?: Date
    updated_at?: Date
    __v?: number
}

export interface UserResponseSignin extends userToken {
    token: string
}

export interface UserSignUpRequest {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface UserSigninRequest {
    email: string
    password: string
}

export interface UserGetAllRequest {
    keyword?: string
}

export interface UserUpdateRequest {
    name?: string
    password?: string
    confirmPassword?: string
}

export interface UserUpdateCondition {
    id: string
    name?: string
    password?: string
    confirmPassword?: string
}