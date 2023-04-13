import mongoose from "mongoose";
// const URI =;

const connectToDB = async () => {
  const res = await mongoose.connect("mongodb://127.0.0.1:27017/mern-auth-project");
  if (res) {
    console.log("Successfully connected to the DB!");
  }
};

export default connectToDB;
