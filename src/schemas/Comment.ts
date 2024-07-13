import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";
import { IItem } from "./Item";

// Define interface for Comments document
export interface IComment extends Document {
  content: string;
  createdAt: Date;
  lastModified: Date;
  userId: IUser["_id"];
  itemId: IItem["_id"];
}

// Define Comments schema
const commentSchema: Schema<IComment> = new Schema(
  {
    content: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
    lastModified: { type: Date, default: () => Date.now() },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  },
  { collection: "comments" }
);

// Create and export Comments model
const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
