import Item from "../schemas/Item";

export async function createItem(itemData: any) {
  try {
    const newItem = new Item(itemData);
    await newItem.save();
    console.log("Item created successfully");
    return newItem;
  } catch (err) {
    console.error(`Error creating item: ${err}`);
    throw err;
  }
}

export async function getItems() {
  try {
    return await Item.find({}).limit(50);
  } catch (err) {
    console.error(`Something went wrong trying to retrieve item data: ${err}\n`);
    throw err;
  }
}
