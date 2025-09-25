import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
