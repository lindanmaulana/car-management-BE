import express from "express"
import uploadMiddleware from "../../../../middlewares/multer"
import auth from "../../../../middlewares/auth"
import { CarImageController } from "./controller"

const route = express()

route.post("/car-images/:id", auth.authenticatedUser, auth.authorizedRoles("admin"), uploadMiddleware.single("image"), CarImageController.create)
route.get("/car-images", auth.authenticatedUser, CarImageController.getAll)
route.patch("/car-images/:id", auth.authenticatedUser, auth.authorizedRoles("admin"), CarImageController.update)
route.delete("/car-images/:id", auth.authenticatedUser, auth.authorizedRoles("admin"), CarImageController.delete)

export default route