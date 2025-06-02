import bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";
import { UserDocumentResult, UserMethods, UserSchema } from "./types";

const {Schema, model} = mongoose


const UserSchema = new Schema<UserSchema, Model<UserDocumentResult>, UserMethods>({
    name: {
        type: String,
        minLength: [3, "Name min 3 character"],
        maxLength: [50, "Name max 50 character"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 8,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
},
{
    timestamps: true
})

UserSchema.pre("save", async function(next) {
    const user = this

    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    next()
})

UserSchema.methods.comparePassword = async function(candidatePassword: string) {
    if(!this.password) throw new Error("Password is not set on this user instance")

    const isMatch = await bcrypt.compare(candidatePassword, this.password)

    return isMatch
}

const User = model<UserSchema, Model<UserDocumentResult, {}, UserMethods>>("User", UserSchema)  

export default User