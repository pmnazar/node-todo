import mongoose, { Document, Model } from "mongoose";
export interface ITodo extends Document {
    title: string;
    user: mongoose.Types.ObjectId;
    completed: boolean;
    tags: string[];
    priority: "low" | "medium" | "high";
    createdAt: Date;
    updatedAt: Date;
}
declare const Todo: Model<ITodo>;
export default Todo;
//# sourceMappingURL=Todo.d.ts.map