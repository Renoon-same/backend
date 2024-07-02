import mongoose from "mongoose";

const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const CLUSTER = process.env.CLUSTER as string;
const DB_NAME = process.env.DB_NAME as string;

const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER}.povokmt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    mongoose.connection.db.command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process with failure
  });

export default mongoose.connection;

export const disconnectMongoDB = async (signal: string) => {
  console.log(`Received ${signal}. Closing MongoDB connection...`);
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process with failure
  }
};
