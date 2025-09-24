import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Todo", todoSchema);
