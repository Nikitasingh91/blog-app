import mongoose from "mongoose";
import validator from "validator"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: [validator.isEmail, "Please enter the valid email"]

    },
    phone: {
        type: Number,
        require: true,
        unique: true



    },
    photo: {
        public_id: {
            type: String,
            required: true

        },
        url: {
            type: String,
            required: true

        }

    },
    education: {
        type: Array,
        require: true


    },
    role: {
        type: String,
        require: true,
        enum: ["user", "admin"],


    },
    token: {
        type: String
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        select: false,

    },
    createdAt: {
        type: Date,
        select: false,
        default: Date.now

    }

})
const User = mongoose.model("User", userSchema)
export default User