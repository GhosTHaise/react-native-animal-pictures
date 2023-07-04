import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
            dbName : "animal_db",
            useNewUrlParser : true,
            useUnifiedTopology : true
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB', error);
    });
}

export default connectDb;