import mongoose, { Schema, Document } from "mongoose";
import { IItem } from "./Item";

// Define interface for User document
export interface IUser extends Document {
  numSwipe: number;
  firstName: string;
  lastName: string;
  bio?: string;
  username: string;
  email: string;
  password: string;
  phone: number;
  class?: number;
  location?: string;
  avatar?: Buffer;
  favList: IItem["_id"][];
  createdAt: Date;
  lastLogIn: Date;
  sellingList: IItem["_id"][];
  buyingList: IItem["_id"][];
}

// Define User schema
const userSchema: Schema<IUser> = new Schema(
  {
    numSwipe: { type: Number, default: 0 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    class: { type: Number },
    location: { type: String },
    avatar: { type: Buffer },
    favList: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    createdAt: { type: Date, default: Date.now },
    lastLogIn: { type: Date, default: Date.now },
    sellingList: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    buyingList: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { collection: "users" }
);

// Create and export User model
const User = mongoose.model<IUser>("User", userSchema);
export default User;
