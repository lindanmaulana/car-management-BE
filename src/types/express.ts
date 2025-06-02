import { Request } from "express";
import { userToken } from "./token-user";

export interface RequestCustom extends Request {
    user?: userToken
    file?: Express.Multer.File
}