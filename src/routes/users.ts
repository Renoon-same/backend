import express from "express";
import { getUsers, createUser } from "../database/user";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("In User...");
    const users = await getUsers();

    if (users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res.status(404);
    }
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Error" });
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

    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Error" });
  }
});

export default router;
