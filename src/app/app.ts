import cookieParser from "cookie-parser";
import cors from "cors";
import express, { ErrorRequestHandler } from "express";
import logger from "morgan";
import path from "path";
import errorHandlerMiddleware from "../middlewares/handler-error";
import UserRoute from "./api/v1/users/router";
import BrandRoute from "./api/v1/brands/router"
import CarRoute from "./api/v1/cars/router"
import CarImageRoute from "./api/v1/car_images/router"

const app = express();
const V1 = "/api/v1";

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "../../public", "images")));

app.use(V1, UserRoute);
app.use(V1, BrandRoute)
app.use(V1, CarRoute)
app.use(V1, CarImageRoute)

app.use(errorHandlerMiddleware as ErrorRequestHandler);

export default app;
