import express from "express";
import { insertUser } from "../database/user";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = req.body;
    if ((await insertUser(data)).valueOf()) {
      res.status(200).json(data);
    } else {
      res.status(500).json(data);
    }
  } catch (error: any) {
    res.status(400).json({ error: error?.message });
  }
});

export default router;
