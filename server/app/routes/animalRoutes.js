import express from "express"
import AnimalController from "../controllers/animalController.js"

const Router  = express.Router();

Router.get("/",AnimalController.GET);
Router.post("/",AnimalController.POST);
Router.delete("/:id",AnimalController.DELETE);

export default Router;