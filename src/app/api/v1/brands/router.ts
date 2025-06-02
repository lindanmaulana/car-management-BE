import express from "express"
import auth from "../../../../middlewares/auth"
import { BrandControllers } from "./controller"

const route = express()

route.post("/brands", auth.authenticatedUser, auth.authorizedRoles("admin"), BrandControllers.create)
route.get("/brands", BrandControllers.getAll)
route.get("/brands/:id", BrandControllers.getOne)
route.patch("/brands/:id", auth.authenticatedUser, auth.authorizedRoles("admin"), BrandControllers.update)
route.delete("/brands/:id", auth.authenticatedUser, auth.authorizedRoles("admin"), BrandControllers.delete)

export default route