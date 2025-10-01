const sql = require('../utilities/postgres.server');
const { v4: uuidv4 } = require('uuid');
const {
    gameStoresTableReset,
    addGameStore,
    getGamesByStore,
    getStoresByGame
} = require('../join-tables/GameStores');
const { storesTableReset } = require('../tables/Stores');
const { gameTableReset } = require('../tables/Games');

async function runGameStoresTests() {
  try {
    console.log("Resetting game_stores table, stores table, and games table...");
    await gameStoresTableReset();
    await storesTableReset();
    await gameTableReset();

    // --- Setup: insert a game + a store ---
    const gameId = uuidv4();
    const storeId = uuidv4();

    await sql`INSERT INTO games (id, rawg_id, slug, name) VALUES (${gameId}, 123, 'test-game', 'Test Game')`;
    await sql`INSERT INTO stores (id, name) VALUES (${storeId}, 'Steam')`;

    // --- Test 1: addGameStore ---
    const relationId = uuidv4();
    const added = await addGameStore({ id: relationId, store_id: storeId, game_id: gameId });
    console.log("Added game_store relation:", added);

    // --- Test 2: getGamesByStore ---
    const gamesByStore = await getGamesByStore(storeId);
    console.log("Games by store:", gamesByStore);

    // --- Test 3: getStoresByGame ---
    const storesByGame = await getStoresByGame(gameId);
    console.log("Stores by game:", storesByGame);

    // --- Test 4: uniqueness constraint ---
    try {
      console.log("Trying to insert duplicate game_store...");
      await addGameStore({ id: uuidv4(), store_id: storeId, game_id: gameId });
    } catch (err: any) {
      console.log("Duplicate insert failed as expected:", err.message);
    }

  } catch (err) {
    console.error("Test failed:", err);
  } 
}

module.exports = { runGameStoresTests };