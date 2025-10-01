const sql = require('../utilities/postgres.server');
const { v4: uuidv4 } = require('uuid');
const { 
    gameTableReset,
    addGame,
    getGame,
    updateGame,
    deleteGame
} = require('../tables/Games');

async function runGamesTests() {
  try {
    console.log("Resetting games table...");
    await gameTableReset();

    // --- Test 1: addGame ---
    const gameId = uuidv4();
    const game = {
      id: gameId,
      rawg_id: 12345,
      slug: "test-game",
      name: "Test Game",
      released: new Date("2020-01-01"),
      playtime: 15,
      background_image: "http://example.com/image.png",
      metacritic: 85,
      created_at: new Date(),
    };

    const inserted = await addGame(game);
    console.log("Inserted game:", inserted);

    // --- Test 2: getGame ---
    const fetched = await getGame(gameId);
    console.log("Fetched game:", fetched);

    // --- Test 3: updateGame ---
    const updatedGame = {
      ...game,
      name: "Updated Test Game",
      playtime: 20,
      metacritic: 90,
    };

    const updated = await updateGame(updatedGame);
    console.log("Updated game:", updated);

    // --- Test 4: deleteGame ---
    const deleted = await deleteGame(updatedGame);
    console.log("Deleted game:", deleted);

  } catch (err) {
    console.error("Test failed:", err);
  } 
}

module.exports = { runGamesTests };
