import jwt from "jsonwebtoken"
import User from "../modals/usermodels.js"
const createTokenandsavecokkies = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
    })
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    })

    await User.findByIdAndUpdate(userId, { token })
    return token

}
export default createTokenandsavecokkies