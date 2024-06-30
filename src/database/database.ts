import { MongoClient, ServerApiVersion } from "mongodb";

const DB_USER = (process.env.DB_USER as string) || "";
const DB_PASSWORD = (process.env.DB_PASSWORD as string) || "";
const CLUSTER_URL = "cluster0";
const DB_NAME = (process.env.DB_NAME as string) || "test";

const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_URL}.povokmt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
async function connectMongoDB() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(DB_NAME).command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process with failure
  }
}

// Disconnect a MongoClient when finish
export const disconnectMongoDB = async (signal: string) => {
  console.log(`Received ${signal}. Closing MongoDB connection...`);
  try {
    await client.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

connectMongoDB().catch(console.error);
let db = client.db(DB_NAME);

export default db;
