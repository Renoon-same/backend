import express from "express";
import { getComments } from "../database/comment";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("In Item...");
    const comments = await getComments();

    if (comments.length > 0) {
      return res.status(200).json(comments);
    } else {
      return res.status(404);
    }
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Error" });
  }
});

export default router;
