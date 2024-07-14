import mongoose from "mongoose";
import User, { IUser } from "../schemas/User";

export async function createUser(userData: IUser) {
  try {
    return await User.create(userData);
  } catch (err) {
    console.error(`Error creating user: ${err}\n`);
    throw err;
  }
}

export async function getAllUsers() {
  try {
    return await User.find({}).limit(50).exec();
  } catch (err) {
    console.error(`Error fetching all users: ${err}\n`);
    throw err;
  }
}

export async function getUserByUsername(username: string) {
  try {
    return await User.findOne({ username }).exec();
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw error;
  }
}

export async function getUserById(userId: mongoose.Types.ObjectId) {
  try {
    return await User.findById(userId).exec();
  } catch (err) {
    console.error(`Error fetching item by id: ${err}\n`);
    throw err;
  }
}

export async function updateUserInfo(userId: mongoose.Types.ObjectId, updateData: Partial<IUser>) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...updateData, lastModified: Date.now() },
      { new: true, runValidators: true }
    ).exec();
    return updatedUser;
  } catch (err) {
    console.error(`Error updating user: ${err}\n`);
    throw err;
  }
}

export async function deleteUser(userId: mongoose.Types.ObjectId) {
  try {
    return await User.findByIdAndDelete(userId).exec();
  } catch (err) {
    console.error(`Error deleting user: ${err}\n`);
    throw err;
  }
}
