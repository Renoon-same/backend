import express from "express";
import { getComments } from "../database/comment";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("In Item...");
    const comments = await getComments();

    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: "There are no available comments" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error?.message });
  }
});

export default router;
