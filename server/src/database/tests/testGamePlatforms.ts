const sql = require('../utilities/postgres.server');
const { v4: uuidv4 } = require('uuid');
const {
    gamePlatformsTableReset,
    addGamePlatform,
    getGamesByPlatform,
    getPlatformsByGame
} = require('../join-tables/GamePlatforms');
const { platformsTableReset } = require('../tables/Platforms');
const { gameTableReset } = require('../tables/Games');

async function runGamePlatformsTests() {
  try {
    console.log("Resetting game_platforms table, platforms table, and games table...");
    await gamePlatformsTableReset();
    await platformsTableReset();
    await gameTableReset();

    // --- Setup: insert a game + a platform ---
    const gameId = uuidv4();
    const platformId = uuidv4();

    await sql`INSERT INTO games (id, rawg_id, slug, name) VALUES (${gameId}, 123, 'test-game', 'Test Game')`;
    await sql`INSERT INTO platforms (id, name) VALUES (${platformId}, 'PC')`;

    // --- Test 1: addGamePlatform ---
    const relationId = uuidv4();
    const added = await addGamePlatform({ id: relationId, platform_id: platformId, game_id: gameId });
    console.log("Added game_platform relation:", added);

    // --- Test 2: getGamesByPlatform ---
    const gamesByPlatform = await getGamesByPlatform(platformId);
    console.log("Games by platform:", gamesByPlatform);

    // --- Test 3: getPlatformsByGame ---
    const platformsByGame = await getPlatformsByGame(gameId);
    console.log("Platforms by game:", platformsByGame);

    // --- Test 4: uniqueness constraint ---
    try {
      console.log("Trying to insert duplicate game_platform...");
      await addGamePlatform({ id: uuidv4(), platform_id: platformId, game_id: gameId });
    } catch (err: any) {
      console.log("Duplicate insert failed as expected:", err.message);
    }

  } catch (err) {
    console.error("Test failed:", err);
  } 
}

module.exports = { runGamePlatformsTests };