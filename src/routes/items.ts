import express from "express";
import { getItems } from "../database/item";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("In Item...");
    const items = await getItems();

    if (items.length > 0) {
      return res.status(200).json(items);
    } else {
      return res.status(404);
    }
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Error" });
  }
});

export default router;
