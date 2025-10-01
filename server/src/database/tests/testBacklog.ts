const sql = require('../utilities/postgres.server');
const { v4: uuidv4 } = require('uuid');
const { 
    backlogTableReset,
    addBacklog,
    getBacklog,
    deleteBacklog,
    addGameToBacklog,
    deleteFromBacklog
} = require('../tables/Backlogs');
const { gameTableReset } = require('../tables/Games');
const { userTableReset } = require('../tables/Users');

async function runBacklogTests() {
  try {
    console.log("Resetting backlog, users, and games tables...");
    await backlogTableReset();
    await userTableReset();
    await gameTableReset();

    // --- Setup: insert a fake user + game so foreign keys don’t break ---
    const userId = uuidv4();
    const gameId = uuidv4();
    await sql`INSERT INTO users (id, username, email, password) VALUES (${userId}, 'testuser', 'test@example.com', 'hashedpassword')`;
    await sql`INSERT INTO games (id, name, rawg_id) VALUES (${gameId}, 'Test Game', 123456)`;

    // --- Test 1: addBacklog ---
    const backlogEntry = {
      id: uuidv4(),
      user_id: userId,
      game_id: gameId,
      status: "playing",
      notes: "First test entry",
      created_at: new Date(),
    };
    const inserted = await addBacklog(backlogEntry);
    console.log("Inserted backlog:", inserted);

    // --- Test 2: getBacklog ---
    const fetched = await getBacklog(userId);
    console.log("Fetched backlog for user:", fetched);

    // --- Test 3: addGameToBacklog ---
    const user = { id: userId, username: "testuser", email: "test@example.com" };
    const addedViaHelper = await addGameToBacklog(user, gameId, "completed", "Finished it!");
    console.log("Added via addGameToBacklog:", addedViaHelper);

    // --- Test 4: deleteFromBacklog ---
    const deletedOne = await deleteFromBacklog(user, gameId);
    console.log("Deleted single game from backlog:", deletedOne);

    // --- Test 5: deleteBacklog (all entries for user) ---
    const deletedAll = await deleteBacklog(userId);
    console.log("Deleted all backlog for user:", deletedAll);

  } catch (err) {
    console.error("Test failed:", err);
  } 
}

module.exports = { runBacklogTests };
