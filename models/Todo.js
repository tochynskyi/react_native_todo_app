import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Todo = new Schema({
  id: { type: String, required: true },
  author: { type: String, ref: "User", required: true },
  checked: { type: Boolean, required: true },
  title: { type: String, required: true },
  priority: { type: Number, required: true },
  addDate: { type: String, required: true },
});

export default model("Todo", Todo);
