const { gameTableReset } = require('..tables/Games.ts');
const { userTableReset } = require('..tables/Users.ts');
const { backlogTableReset } = require('..tables/Backlogs.ts');
const { genresTableReset } = require('..tables/Genres.ts');
const { platformsTableReset } = require('..tables/Platforms.ts');
const { ratingsTableReset } = require('..tables/Ratings.ts');
const { storesTableReset } = require('..tables/Stores.ts');
const {gameGenresTableReset} = require('..join-tables/GameGenres.ts');
const {gamePlatformsTableReset} = require('..join-tables/GamePlatforms.ts');
const {gameStoresTableReset} = require('..join-tables/GameStores.ts');   
const sql = require('./postgres.server');

async function resetDatabase() {
    await gameTableReset();
    await userTableReset();
    await backlogTableReset();
    await genresTableReset();
    await platformsTableReset();
    await ratingsTableReset();
    await storesTableReset();
    await gameGenresTableReset();
    await gamePlatformsTableReset();
    await gameStoresTableReset();
    console.log("Database has been reset.");
}

// Export the function so it can be called from a small runner script or from the server entrypoint
module.exports = { resetDatabase };