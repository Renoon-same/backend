import express from "express";
import { getItems } from "../database/item";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("In Item...");
    const items = await getItems();

    if (items.length > 0) {
      res.status(200).json(items);
    } else {
      res.status(404).json({ message: "There are no available items" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error?.message });
  }
});

export default router;
