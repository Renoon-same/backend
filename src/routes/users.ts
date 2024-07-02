import express from "express";
import { getUsers, createUser } from "../database/user";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("In User...");
    const users = await getUsers();

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "There are no available users" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error?.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { numSwipe, firstName, lastName, bio, username, email, password, phone } = req.body;
    const newUser = await createUser({
      numSwipe,
      firstName,
      lastName,
      bio,
      username,
      email,
      password,
      phone,
    });

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: error?.message });
  }
});

export default router;
