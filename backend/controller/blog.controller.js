import mongoose from "mongoose";
import Blog from "../modals/blog.model.js";
import { v2 as cloudinary } from 'cloudinary';

const createBlog = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "blog image required" })
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png"]
    if (!allowedFormats.includes(blogImage.mimetype)) {
        return res.status(400).json({ message: "invalid photo form only allowed jpg" })

    }

    const { category, title, about } = req.body
    if (!category || !title || !about) {
        return res.json({ message: "category , title , about are required feild" })
    }
    const adminName = req?.user?.name
    const adminPhoto = req?.user?.photo?.url
    const createdBy = req?.user?._id
    const cloudanryResponse = await cloudinary.uploader.upload(
        blogImage.tempFilePath
    )
    if (cloudanryResponse || cloudanryResponse.error) {
        console.log(cloudanryResponse.error);

    }
    const newblog = {
        category, title, about, adminName, adminPhoto, createdBy, blogImage: {
            public_id: cloudanryResponse.public_id,
            url: cloudanryResponse.url,
        }
    }
    const blog = await Blog.create(newblog)


    if (blog) {
        return res.json({ message: "blog create successfully", blog })
    }


}
const deleteBlog = async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findById(id)
    if (!blog) {
        return res.json({ message: "blog is not found" })
    }
    await blog.deleteOne()
    res.json({ message: "blog deleted sucessfully" })

}
const getallblog = async (req, res) => {
    const resp = await Blog.find()
    return res.json(resp)
}
const getSingleBlogs = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ message: "invalid blog id" })
    }

    const blog = await Blog.findById(id);
    if (!blog) {
        return res.json({ message: "blog not found" })
    }
    res.json(blog)

}

const getmyBLogs = async (req, res) => {
    const createdBy = req.user._id;
    const myblog = await Blog.find({ createdBy })
    return res.json(myblog)
};
const updateBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ message: "invalid blog id" })
    }
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
    if (!updateBlog) {
        return res.json({ message: "blog not found" })
    }
    res.json(updateBlog)
}

export default { createBlog, deleteBlog, getallblog, getSingleBlogs, getmyBLogs, updateBlog }