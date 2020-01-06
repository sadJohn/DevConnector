import mongoose from "mongoose";
import config from "config";

const mongodb: string = config.get("mongodb");

const connectDB = () => {
  try {
    mongoose.connect(mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    const db = mongoose.connection;
    db.on("error", () => console.log("connection error:"));
    db.once("open", () => console.log("MongoDB Connected..."));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
export default connectDB;
