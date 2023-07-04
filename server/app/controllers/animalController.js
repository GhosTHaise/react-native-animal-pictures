import multer from "multer";
import connectDb from "../models/mongoDb.js";
import Animal from "../models/Schema/Animal.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary} from "cloudinary";

const storage = multer.memoryStorage();
const Upload = multer({ storage});

dotenv.config();
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
  });

const GET = async (req,res) => {
    try {
        connectDb();
        const data = await Animal.find({});
        console.log(data);
        res.status(200).json({
            message : "Hello"
        })
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}

const POST = async (req,res) => {
    const {name,type,color,photo} = req.body;
    try {
        //store image first
        const photo_url = cloudinary.uploader.upload(photo);

        connectDb();
        const new_animal = new Animal({
            name,
            type,
            color,
            photo_url
        })
        await new_animal.save();
        res.status(202).json({
            message : "New Animal Saved !"
        });
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
}

export default {
    GET
}