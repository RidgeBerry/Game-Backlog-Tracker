// Import test functions for each table
const { runUsersTests } = require('./testUsers');
const { runGamesTests } = require('./testGames');
const { runGenresTests } = require('./testGenres');
const { runPlatformsTests } = require('./testPlatforms');
const { runRatingsTests } = require('./testRatings');
const { runStoresTests } = require('./testStores');
const { runBacklogTests } = require('./testBacklog');
const { runGameGenresTests } = require('./testGameGenres');
const { runGamePlatformsTests } = require('./testGamePlatforms');
const { runGameStoresTests } = require('./testGameStores');
const { resetDatabase } = require('../utilities/databasereset');


async function runAllTests() {
  try {
    console.log("Resetting entire database...");
    await resetDatabase();

    // Run tests for each table
    console.log("\n===== USERS TABLE =====");
    await runUsersTests();

    console.log("\n===== GAMES TABLE =====");
    await runGamesTests();

    console.log("\n===== GENRES TABLE =====");
    await runGenresTests();

    console.log("\n===== PLATFORMS TABLE =====");
    await runPlatformsTests();

    console.log("\n===== RATINGS TABLE =====");
    await runRatingsTests();

    console.log("\n===== STORES TABLE =====");
    await runStoresTests();

    console.log("\n===== BACKLOG TABLE =====");
    await runBacklogTests();

    console.log("\n===== GAME_GENRES TABLE =====");
    await runGameGenresTests();

    console.log("\n===== GAME_PLATFORMS TABLE =====");
    await runGamePlatformsTests();

    console.log("\n===== GAME_STORES TABLE =====");
    await runGameStoresTests();

    console.log("\nAll tests completed!");
  } catch (err) {
    console.error("Error running tests:", err);
  }
}

module.exports = { runAllTests };

