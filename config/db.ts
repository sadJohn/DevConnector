import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
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
