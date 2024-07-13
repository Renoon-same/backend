import Comment from "../schemas/Comment";

export async function createComment(commentData: any) {
  try {
    const newComment = new Comment(commentData);
    await newComment.save();
    console.log("Comment created successfully");
    return newComment;
  } catch (err) {
    console.error(`Error creating comment: ${err}`);
    throw err;
  }
}

export async function getComments() {
  try {
    return await Comment.find({}).limit(50);
  } catch (err) {
    console.error(`Something went wrong trying to retrieve comment data: ${err}\n`);
    throw err;
  }
}
