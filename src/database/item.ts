import mongoose from "mongoose";
import Item, { IItem } from "../schemas/Item";

export async function createItem(itemData: IItem) {
  try {
    return await Item.create(itemData);
  } catch (err) {
    console.error(`Error creating item: ${err}\n`);
    throw err;
  }
}

export async function getAllItems() {
  try {
    return await Item.find({}).limit(50).exec();
  } catch (err) {
    console.error(`Error fetching all items: ${err}\n`);
    throw err;
  }
}

export async function getItemById(itemId: mongoose.Types.ObjectId) {
  try {
    return await Item.findById(itemId).exec();
  } catch (err) {
    console.error(`Error fetching item by id: ${err}\n`);
    throw err;
  }
}

export async function getAllItemsByUserId(userId: mongoose.Types.ObjectId) {
  try {
    return await Item.find({ userId }).exec();
  } catch (err) {
    console.error(`Error fetching items by userId: ${err}\n`);
    throw err;
  }
}

export async function updateItem(itemId: mongoose.Types.ObjectId, updateData: Partial<IItem>) {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { ...updateData, lastModified: Date.now() },
      { new: true, runValidators: true }
    ).exec();
    return updatedItem;
  } catch (err) {
    console.error(`Error updating item: ${err}\n`);
    throw err;
  }
}

export async function deleteItem(itemId: mongoose.Types.ObjectId) {
  try {
    return await Item.findByIdAndDelete(itemId).exec();
  } catch (err) {
    console.error(`Error deleting item: ${err}\n`);
    throw err;
  }
}
