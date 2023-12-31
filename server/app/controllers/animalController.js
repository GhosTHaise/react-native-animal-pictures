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
        //console.log(data);
        res.status(200).json({
            data : data
        })
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}

const POST = async (req,res) => {
    const {name,type,color,photo} = req.body;
    //console.log(name,type,color,photo);
    try {
        //store image first
        const photo_url = await cloudinary.uploader.upload(photo.url);
        console.log(photo_url)
        connectDb();
        const new_animal = new Animal({
            name,
            type,
            color,
            imageUrl : photo_url.url
        })
        const saved_animal = await new_animal.save();
        res.status(202).json({
            message : "New Animal Saved !",
            data : saved_animal
        });
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
}

const DELETE = async(req,res) => {
    const {id} = req.params;
    //console.log(id);
    try {
        connectDb();
        const deleted = await Animal.findOneAndRemove({_id : id});
        res.status(202).json({
            message : "Animal Deleted !",
            data : deleted
        });
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
}

const PATCH = async (req,res) => {
    const {id,name,type,color, photo} = req.body;
    try {
        connectDb();
        const _updating = await Animal.findOne({_id : id});
        console.log(_updating);
        if(_updating != []){
            _updating.name = name;
            _updating.type = type;
            _updating.color = color;
            if(photo != null){
                const photo_url = await cloudinary.uploader.upload(photo.url);
                console.log(photo_url)
                _updating.photo = photo_url.url
            }
            await _updating.save();
            res.status(202).json({
                message : "Animal Update !",
                data : _updating
            });
        }
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
}

export default {
    GET,
    POST,
    DELETE,
    PATCH
}