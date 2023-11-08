
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default dbConnect;
