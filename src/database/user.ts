import User from "../schemas/User";

export async function createUser(userData: any) {
  try {
    const newUser = new User(userData);
    await newUser.save();
    console.log("User created successfully");
    return newUser;
  } catch (err) {
    console.error(`Error creating user: ${err}`);
    throw err;
  }
}

export async function getUsers() {
  try {
    return await User.find({}).limit(50);
  } catch (err) {
    console.error(`Something went wrong trying to retrieve user data: ${err}\n`);
    throw err;
  }
}
