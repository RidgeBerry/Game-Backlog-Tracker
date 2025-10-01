const sql = require('../utilities/postgres.server');
const { v4: uuidv4 } = require('uuid');
const {
    userTableReset,
    addUser,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser
} = require('../tables/Users');

async function runUsersTests() {
  try {
    console.log("Resetting users table...");
    await userTableReset();

    // --- Test 1: addUser ---
    const userId = uuidv4();
    const user = {
      id: userId,
      username: "test_user",
      password: "secret123", // in real apps, always hash!
      email: "test@example.com",
      created_at: new Date()
    };

    const inserted = await addUser(user);
    console.log("Inserted user:", inserted);

    // --- Test 2: getUserById ---
    const fetchedById = await getUserById(userId);
    console.log("Fetched by ID:", fetchedById);

    // --- Test 3: getUserByUsername ---
    const fetchedByUsername = await getUserByUsername("test_user");
    console.log("Fetched by Username:", fetchedByUsername);

    // --- Test 4: updateUser ---
    const updatedUser = { ...user, username: "updated_user", email: "updated@example.com" };
    const updated = await updateUser(updatedUser);
    console.log("Updated user:", updated);

    // --- Test 5: deleteUser ---
    const deleted = await deleteUser(userId, "updated_user");
    console.log("Deleted user:", deleted);

    // --- Test 6: uniqueness constraint ---
    try {
      console.log("Testing duplicate username/email...");
      const user2 = { ...user, id: uuidv4() };
      await addUser(user2);
      await addUser({ ...user2, id: uuidv4() }); // duplicate username/email
    } catch (err: any) {
      console.log("Duplicate insert failed as expected:", err.message);
    }

  } catch (err) {
    console.error("Test failed:", err);
  } 
}

module.exports = { runUsersTests };