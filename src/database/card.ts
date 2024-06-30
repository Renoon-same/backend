import db from "./database";

const collectionName = "cards";

export async function getCards() {
  try {
    const collection = await db.collection(collectionName);
    return await collection.find({}).limit(50).toArray();
  } catch (err) {
    console.error(`Something went wrong trying to retrieve cards data: ${err}\n`);
  }
}
