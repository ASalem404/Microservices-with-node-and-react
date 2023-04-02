import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  if (!process.env.jwt) throw new Error("jwt is required");
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connecting to MongoDB");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening in port 3000");
  });
};

start();
