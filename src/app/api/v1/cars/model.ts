import mongoose, { Types } from "mongoose";
import { CarSchema } from "./types";

const {Schema, model} = mongoose

const CarSchema = new Schema<CarSchema>({
    name: {
        type: String,
        required: true
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    model: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "rented", "sold"],
        default: "available"
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    thumbnail: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
})

const Cars = model<CarSchema>("Car", CarSchema)

export default Cars