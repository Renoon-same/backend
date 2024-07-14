import express, { Request, Response } from "express";
import mongoose from "mongoose";
import * as itemService from "../database/item";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const item = await itemService.createItem(req.body);
    res.status(201).send(item);
  } catch (error: unknown) {
    res.status(500).send({ error: "Internal Error" });
  }
});

router.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await itemService.getAllItems();
    if (items.length > 0) {
      return res.status(200).send(items);
    } else {
      return res.status(404).send();
    }
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const itemId = new mongoose.Types.ObjectId(req.params.id);
    const item = await itemService.getItemById(itemId);
    if (item) {
      return res.status(200).send(item);
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
    const items = await itemService.getAllItemsByUserId(userId);
    if (items.length > 0) {
      return res.status(200).send(items);
    } else {
      return res.status(404).send();
    }
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const itemId = new mongoose.Types.ObjectId(req.params.id);
    if (!req.body) {
      return res.status(400).send();
    }
    const updatedItem = await itemService.updateItem(itemId, req.body);
    if (!updatedItem) {
      return res.status(404).send();
    }
    return res.status(200).send(updatedItem);
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const itemId = new mongoose.Types.ObjectId(req.params.id);
    const deletedItem = await itemService.deleteItem(itemId);
    if (!deletedItem) {
      return res.status(404).send();
    }
    return res.status(200).send();
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

export default router;
