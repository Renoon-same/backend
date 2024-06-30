import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "./config/dotenv";
import { disconnectMongoDB } from "./database/database";

// import the router from routes file
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", async (request, response) => {
  response.status(200).json({ message: "Welcome to FB Market API!" });
});

// Specify the api path for the server to use
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Global error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send("Uh oh! An unexpected error occurred.");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});

// Handle termination signals
const originalSigint = process.listeners("SIGINT")[0];
const originalSigterm = process.listeners("SIGTERM")[0];

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing MongoDB connection...");
  await disconnectMongoDB("SIGINT");
  if (originalSigint) originalSigint.call(process, "SIGINT");
  else process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Closing MongoDB connection...");
  await disconnectMongoDB("SIGTERM");
  if (originalSigterm) originalSigterm.call(process, "SIGTERM");
  else process.exit(0);
});
