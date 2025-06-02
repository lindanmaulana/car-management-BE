import mongoose from "mongoose"
import { BrandSchema } from "./types"

const {Schema, model} = mongoose

const BrandSchema = new Schema<BrandSchema>({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const Brands = model<BrandSchema>("Brand", BrandSchema)

export default Brands