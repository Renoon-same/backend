import mongoose, { Schema, Document } from "mongoose";

// Enum for status
enum ItemStatus {
  Available = "Available",
  Sold = "Sold",
  Cancelled = "Cancelled",
}

// Enum for category
enum ItemCategory {
  Electronics = "Electronics and Gadgets",
  Schools = "Books and Study Materials",
  Furniture = "Furniture and Dorm Essentials",
  Clothing = "Clothing and Accessories",
  Health = "Health and Personal Care",
  Sport = "Hobbies and Recreational Items",
  Cooking = "Kitchen and Cooking Supplies",
  Others = "Others and Miscellaneous",
}

// Define interface for Item document
export interface IItem extends Document {
  name: string;
  price: number;
  description: string;
  image: Buffer;
  category: ItemCategory;
  createdBy: number; // userId
  createdAt: Date;
  lastModified: Date;
  status: ItemStatus;
  payPeriod?: number;
}

// Define Item schema
const itemSchema: Schema<IItem> = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: Buffer },
    category: { type: String, enum: Object.values(ItemCategory), required: true },
    createdBy: { type: Number, required: true }, // userId
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    status: { type: String, enum: Object.values(ItemStatus), default: ItemStatus.Available },
    payPeriod: { type: Number, default: 7 },
  },
  { collection: "items" }
);

// Create and export Item model
const Item = mongoose.model<IItem>("Item", itemSchema);
export default Item;
