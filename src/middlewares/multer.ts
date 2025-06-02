import { Request } from "express"
import multer, { FileFilterCallback } from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public', 'images'))
    },
    filename: (req, file, cb) => {
        cb(null, Math.floor(Math.random() * 99) + "_" + file.originalname)
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true)
    } else {
        cb(new Error("Unsupported file format"))
    }
}

const uploadMiddleware = multer({
    storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter
})


export default uploadMiddleware