import express from "express"
import con from "../controller/user.controller.js"
import { isAuthenticated } from "../middleware/authUser.js"
const { register, login, logout, myProfile, getAdmins } = con
const routes = express.Router()
routes.post("/register", register)
routes.post("/login", login)
routes.get("/logout", isAuthenticated, logout)
routes.get("/myprofile", isAuthenticated, myProfile)
routes.get("/admins", getAdmins)
export default routes