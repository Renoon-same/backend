import mongoose, { Schema, Document } from "mongoose";

// Define interface for Comments document
export interface IComment extends Document {
  content: string;
  createdAt: Date;
  lastModified: Date;
  userId: number;
  objectId: number;
}

// Define Comments schema
const commentSchema: Schema<IComment> = new Schema(
  {
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    userId: { type: Number, required: true },
    objectId: { type: Number, required: true },
  },
  { collection: "comments" }
);

// Create and export Comments model
const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
