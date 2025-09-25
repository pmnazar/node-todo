import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRefreshTaken extends Document {
  token: string;
  userId: Types.ObjectId;
  expiresAt: Date;
}
const refreshTokenSchema = new Schema<IRefreshTaken>({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model<IRefreshTaken>(
  "RefreshToken",
  refreshTokenSchema,
);
