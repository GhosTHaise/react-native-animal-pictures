import mongoose,{ Schema , model } from "mongoose";

const AnimalSchema = new Schema({
    name : {
        type : String,
        required : [true , "Name is required."]
    },
    type : {
        type : String,
        required : [true , "Type is required."]
    },
    color : {
        type : String,
        required : [true , "Couleur is required."]
    },
    imageUrl : {
        type : String,
        required : [true , "ImageUrl is required."]
    },
});

const Animal = new model("Animal" ,AnimalSchema)

export default Animal;