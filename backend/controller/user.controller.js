import User from "../modals/usermodels.js"
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcrypt"
import createTokenandsavecokkies from "../jwt/AuthToken.js";
const register = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "users phone is required" })
    }
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png"]
    if (!allowedFormats.includes(photo.mimetype)) {
        return res.status(400).json({ message: "invalid photo form only allowed jpg" })

    }

    const { email, password, role, education, name, phone } = req.body
    if (!email || !password || !role || !education || !name || !phone) {
        return res.json({ message: "All feild mendatory" })
    }
    const user = await User.findOne({ email });
    if (user) {
        return res.json({ message: "user all ready exit" })
    }
    const cloudanryResponse = await cloudinary.uploader.upload(
        photo.tempFilePath
    )
    if (cloudanryResponse || cloudanryResponse.error) {
        console.log(cloudanryResponse.error);

    }
    const password_hash = await bcrypt.hash(password, 10)
    const newuser = new User({
        email, password: password_hash, role, education, name, phone, photo: {
            public_id: cloudanryResponse.public_id,
            url: cloudanryResponse.url,
        }
    })
    await newuser.save()
    const token = await createTokenandsavecokkies(newuser._id, res)
    if (newuser) {
        return res.json({ message: "user create successfully", newuser, token: token })
    }


}
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please fill required fields" });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user.role !== role) {
            return res.status(400).json({ message: `Given role '${role}' not found` });
        }

        const token = await createTokenandsavecokkies(user._id, res);

        return res.json({
            message: "User login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                adminPhoto: user.adminPhoto
            },
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const logout = async (req, res) => {
    res.clearCookie("jwt")
    res.json({ message: "user logout sucessfully" })
}
const myProfile = async (req, res) => {
    const user = await req.user;
    res.json(user)

}
const getAdmins = async (req, res) => {
    const admins = await User.find({ role: "admin" })
    res.json(admins)
}
export default { register, login, logout, myProfile, getAdmins }