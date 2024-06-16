import User from "../schemas/User";
import { getMongoDBClient } from "./database";

const dbClient = getMongoDBClient();
const dbName = "userdb";
const collectionName = "User";

export async function insertUser(data: User[]) {
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
