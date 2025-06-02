import express from "express"
import auth from "../../../../middlewares/auth"
import { CarController } from "./controller"

const route = express()

route.post("/cars", auth.authenticatedUser, auth.authorizedRoles("admin"), CarController.create)
route.get("/cars", auth.authenticatedUser, CarController.getAll)
route.get("/cars/:id", auth.authenticatedUser, CarController.getOne)
route.patch("/cars/:id", auth.authenticatedUser, auth.authorizedRoles("admin"), CarController.update)
route.delete("/cars/:id", auth.authenticatedUser, auth.authorizedRoles("admin"), CarController.delete)

export default route