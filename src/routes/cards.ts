import express from "express";
import { getCards } from "../database/card";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("In card...");
    const cards = await getCards();
    if (cards) {
      res.status(200).json(cards.valueOf());
    } else {
      res.status(404).json({ message: "There is no available cards" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error?.message });
  }
});

export default router;
