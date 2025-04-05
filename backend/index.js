import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import routes from "./routes/user.route.js"
import fileUpload from "express-fileupload"
import { v2 as cloudinary } from 'cloudinary';
import blogroutes from "./routes/blog.route.js"
import cookieParser from "cookie-parser"
const app = express()
dotenv.config()
const port = process.env.PORT
const mongourl = process.env.MONGOURL
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

//file upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))
try {
    mongoose.connect(mongourl)
    console.log("database connected suceesfully"
    );



}
catch (error) {
    console.log(error);

}

app.use("/api/user", routes)
app.use("/api/blogs", blogroutes)
//coudaniry
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});

app.listen(port, () => {
    console.log(`your server run on ${port}`);

})
