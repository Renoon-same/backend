import { MongoClient, ServerApiVersion } from "mongodb";

const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const cluster_url = "cluster0";
const DB_NAME = "admindb";

const MONGODB_URI =
  "mongodb+srv://" +
  DB_USER +
  ":" +
  DB_PASSWORD +
  "@" +
  cluster_url +
  ".povokmt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const getMongoDBClient = () => {
  return client;
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const connectMongoDB = async () => {
  try {
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db(DB_NAME).command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

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
