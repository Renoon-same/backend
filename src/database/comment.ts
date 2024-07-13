import mongoose from "mongoose";
import Comment, { IComment } from "../schemas/Comment";

export async function createComment(commentData: IComment) {
  try {
    return await Comment.create(commentData);
  } catch (err) {
    console.error(`Error creating comment: ${err}\n`);
    throw err;
  }
}

export async function getAllComments() {
  try {
    return await Comment.find({}).limit(50).exec();
  } catch (err) {
    console.error(`Error fetching all comments: ${err}\n`);
    throw err;
  }
}

export async function getCommentsByItemId(itemId: mongoose.Types.ObjectId) {
  try {
    return await Comment.find({ itemId }).exec();
  } catch (err) {
    console.error(`Error fetching comments by itemId: ${err}\n`);
    throw err;
  }
}

export async function getCommentsByUserId(userId: mongoose.Types.ObjectId) {
  try {
    return await Comment.find({ userId }).exec();
  } catch (err) {
    console.error(`Error fetching comments by userId: ${err}\n`);
    throw err;
  }
}

export async function updateComment(commentId: mongoose.Types.ObjectId, newContent: string) {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content: newContent, lastModified: Date.now() },
      { new: true, runValidators: true }
    ).exec();
    return updatedComment;
  } catch (err) {
    console.error(`Error updating comment: ${err}\n`);
    throw err;
  }
}

export async function deleteComment(commentId: mongoose.Types.ObjectId) {
  try {
    return await Comment.findByIdAndDelete(commentId).exec();
  } catch (err) {
    console.error(`Error deleting comment: ${err}\n`);
    throw err;
  }
}
