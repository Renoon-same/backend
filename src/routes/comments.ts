import express, { Request, Response } from "express";
import mongoose from "mongoose";
import * as commentService from "../database/comment";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).send(comment);
  } catch (error: unknown) {
    res.status(500).send({ error: "Internal Error" });
  }
});

router.get("/", async (_req: Request, res: Response) => {
  try {
    const comments = await commentService.getAllComments();
    if (comments.length > 0) {
      return res.status(200).send(comments);
    } else {
      return res.status(404).send();
    }
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

router.get("/item/:itemId", async (req: Request, res: Response) => {
  try {
    const itemId = new mongoose.Types.ObjectId(req.params.itemId);
    const comments = await commentService.getCommentsByItemId(itemId);
    if (comments.length > 0) {
      return res.status(200).send(comments);
    } else {
      return res.status(404).send();
    }
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const comments = await commentService.getCommentsByUserId(userId);
    if (comments.length > 0) {
      return res.status(200).send(comments);
    } else {
      return res.status(404).send();
    }
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const commentId = new mongoose.Types.ObjectId(req.params.id);
    const { content } = req.body;
    if (!content) {
      return res.status(400).send();
    }
    const updatedComment = await commentService.updateComment(commentId, content);
    if (!updatedComment) {
      return res.status(404).send();
    }
    return res.status(200).send(updatedComment);
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const commentId = new mongoose.Types.ObjectId(req.params.id);
    const deletedComment = await commentService.deleteComment(commentId);
    if (!deletedComment) {
      return res.status(404).send();
    }
    return res.status(200).send();
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

export default router;
