import mongoose from "mongoose";

const DEFAULT_URI = "mongodb://127.0.0.1:27017/mern-auth-project";

const connectToDB = async () => {
  const res = await mongoose.connect(process.env.MONGO_URI || DEFAULT_URI);
  if (res) {
    console.log("Successfully connected to the DB!");
  }
};

export default connectToDB;
