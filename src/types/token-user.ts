import { Types } from "mongoose"

export type userToken = {
    _id: Types.ObjectId
    name: string
    role: string
}