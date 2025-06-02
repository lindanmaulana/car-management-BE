import mongoose from "mongoose";
import { CarImageSchema } from "./types";

const {Schema, model} = mongoose

const CarImageSchema = new Schema<CarImageSchema>({
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },

    image_url: {
        type: String,
        required: true
    },

    is_primary: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const CarImage = model<CarImageSchema>("Car_image", CarImageSchema)
export default CarImage