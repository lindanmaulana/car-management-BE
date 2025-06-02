import mongoose from "mongoose";
import { CarDetailSchema } from "./types";

const {Schema, model} = mongoose

const CarDetailSchema = new Schema<CarDetailSchema>({
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    transmission: {
        type: String,
        enum: ["manual", "automatic"],
        default: "manual"
    },
    
    fuel_type: {
        type: String,
        enum: ["bensin", "solar", "listrik", "hybrid"],
        default: "bensin"
    },

    plate_number: {
        type: String,
        required: true
    },

    mileage: {
        type: Number,
        default: 0
    },
    
    color: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: "-"
    },
},
{
    timestamps: true
}
)


const CarDetail = model<CarDetailSchema>("Car_detail", CarDetailSchema)
export default CarDetail