import mongoose from "mongoose";
import config from "../config/config";

// mongodb setup using mongoose
// async await method, can separate into another file
const connectDB = async () => {
  try {
    if (!config.mongo.url) {
      throw new Error("MongoDB URL is not defined in the configuration.");
    }
    await mongoose.connect(config.mongo.url, config.mongo.options);
    console.log("Mongo connected");
  } catch (error) {
    console.error("Error connecting to Mongo", error);

    // exit the process with a failure code 1 if connection fails
    process.exit(1);
  }
};

export default connectDB;

// .then.catch method
// mongoose
//   .connect(config.mongo.url, config.mongo.options)
//   .then(() => {
//     console.log("Mongo connected");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
