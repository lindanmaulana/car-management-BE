import express from "express"
import { UserControllers } from "./controller"
import auth from "../../../../middlewares/auth"

const route = express()

route.post("/auth/signup", UserControllers.signUp)
route.post("/auth/signin", UserControllers.signIn)
route.patch("/users/update", auth.authenticatedUser, UserControllers.update)
route.get("/users/profile", auth.authenticatedUser, UserControllers.getOne)
route.get("/users", auth.authenticatedUser, auth.authorizedRoles("admin"), UserControllers.getAll)

export default route