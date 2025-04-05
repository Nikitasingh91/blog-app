
import jwt from "jsonwebtoken"
import User from "../modals/usermodels.js";

//athenctication 
export const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.jwt
    console.log("middleware", token);
    if (!token) {
        return res.json({ message: "user not athenticated" })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findById(decoded.userId)
    if (!user) {
        return res.json({ message: "user not found" })
    }
    req.user = user
    next()

}


//athorization
export const isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.json({ error: `user with given role ${req.user.role} not allowed` })
        }
        next()
    }
}