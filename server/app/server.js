import express from "express";
import cors from "cors";
import AnimalRoute from "./routes/animalRoutes.js";
const app = new express();
app.use(cors());
app.use(express.json({limit : "50mb"}));

app.use("/api/animal",AnimalRoute);


app.listen(8080,() => console.log(`Server start on : http://localhost:8080`));