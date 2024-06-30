import express from "express";
import { getUsers } from "../database/user";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("In User...");
    const users = await getUsers();
    if (users) {
      res.status(200).json(users.valueOf());
    } else {
      res.status(404).json({ message: "There is no available users" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error?.message });
  }
});

export default router;
