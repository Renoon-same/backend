import db from "./database";

const collectionName = "users";

export async function getUsers() {
  try {
    const collection = await db.collection(collectionName);
    return await collection.find({}).limit(50).toArray();
  } catch (err) {
    console.error(`Something went wrong trying to retrieve users data: ${err}\n`);
  }
}
