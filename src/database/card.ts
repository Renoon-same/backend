import Card from "../schemas/Card";
import { getMongoDBClient } from "./database";

const dbClient = getMongoDBClient();
const dbName = "carddb";
const collectionName = "Card";

export async function insertCard(data: Card[]) {
  await dbClient.connect();
  const database = dbClient.db(dbName);
  const collection = database.collection(collectionName);
  try {
    const insertManyResult = await collection.insertMany(data);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
    return true;
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    return false;
  }
}
