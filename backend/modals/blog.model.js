import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    blogImage: {
        public_id: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true,

        }
    },
    about: {
        type: String,
        require: true,
        minlength: [10, "min len should be 10"]
    },
    adminName: {
        type: String,
        require: true,

    },
    adminPhoto: {
        type: String,
        require: true


    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

}, { timestamps: true })
const Blog = mongoose.model("Blog", blogSchema)
export default Blog