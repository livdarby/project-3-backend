import express from "express"
import mongoose from "mongoose";
import router from "./views/Router";

const app = express();


app.use(express.json());
app.use(router);

async function start() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shopdb");
  console.log("Connected to the database! 🔥");

  app.listen(8000, () => {
    console.log("Express API is running on http://localhost:8000");
  });
}
start();
