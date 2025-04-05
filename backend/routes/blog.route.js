import express from "express"
import blogcontroller from "../controller/blog.controller.js"
import { isAdmin, isAuthenticated } from "../middleware/authUser.js"
const { createBlog, deleteBlog, getallblog, getSingleBlogs, getmyBLogs, updateBlog } = blogcontroller
const blogroutes = express.Router()
blogroutes.post("/create", isAuthenticated, isAdmin("admin"), createBlog)
blogroutes.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteBlog)
blogroutes.get("/allblog", getallblog)
blogroutes.get("/single-blog/:id", isAuthenticated, getSingleBlogs)
blogroutes.get("/myblogs", isAuthenticated, isAdmin("admin"), getmyBLogs)
blogroutes.put("/update/:id", isAuthenticated, isAdmin("admin"), updateBlog)
export default blogroutes