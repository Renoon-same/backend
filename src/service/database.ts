import { MongoClient, ServerApiVersion } from 'mongodb';
import User from '../schemas/User'
import Card from '../schemas/Card'

const uri = "mongodb+srv://admin:adminpass@cluster0.povokmt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "myDatabase";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when finish/error
    await client.close();
  }
}

export async function insertUser(data: User[]) {
  await client.connect();
  const collectionName = "User"
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  try {
    const insertManyResult = await collection.insertMany(data);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
    return true;
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    return false;
  } finally {
    await client.close();
  }
}

export async function insertCard(data: Card[]) {
  await client.connect();
  const collectionName = "Card"
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  try {
    const insertManyResult = await collection.insertMany(data);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
    return true;
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    return false;
  } finally {
    await client.close();
  }
}
