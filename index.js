import { config } from "dotenv";
config();
import express from "express";
import mongoose from "mongoose";
import router from "./routes/router.js";

const PORT = process.env.PORT || 4000;
const URL_DB =
  "mongodb+srv://tochynskyi:qwerty123456@cluster0.qfbba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(URL_DB);
    app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
