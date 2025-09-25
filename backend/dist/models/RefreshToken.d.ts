import mongoose, { Document, Types } from "mongoose";
export interface IRefreshTaken extends Document {
    token: string;
    userId: Types.ObjectId;
    expiresAt: Date;
}
declare const _default: mongoose.Model<IRefreshTaken, {}, {}, {}, mongoose.Document<unknown, {}, IRefreshTaken, {}, {}> & IRefreshTaken & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=RefreshToken.d.ts.map