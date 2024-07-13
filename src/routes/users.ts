import express, { Request, Response } from "express";
import mongoose from "mongoose";
import * as userService from "../database/user";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    // TODO: hash password and store in the next PR
    const { email, password } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@depauw\.edu$/i;
    if (!emailRegex.test(email)) {
      return res.status(400).send();
    }

    const user = await userService.createUser(req.body);
    res.status(201).send(user);
  } catch (error: unknown) {
    res.status(500).send({ error: "Internal Error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    if (users.length > 0) {
      return res.status(200).send(users);
    } else {
      return res.status(404).send();
    }
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    const user = await userService.getUserById(userId);
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send();
    }
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(501).send({ error: "Invalid Username" });
    }

    const user = await userService.getUserByUsername(username);
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send();
    }
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    if (!req.body) {
      return res.status(400).send();
    }
    const updatedUser = await userService.updateUserInfo(userId, req.body);
    if (!updatedUser) {
      return res.status(404).send();
    }
    return res.status(200).send(updatedUser);
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    const deletedUser = await userService.deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).send();
    }
    return res.status(200).send();
  } catch (error: unknown) {
    return res.status(500).send({ error: "Internal Error" });
  }
});

export default router;
