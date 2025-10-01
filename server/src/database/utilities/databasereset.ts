const { gameTableReset } = require('../tables/Games');
const { userTableReset } = require('../tables/Users');
const { backlogTableReset } = require('../tables/Backlogs');
const { genresTableReset } = require('../tables/Genres');
const { platformsTableReset } = require('../tables/Platforms');
const { ratingsTableReset } = require('../tables/Ratings');
const { storesTableReset } = require('../tables/Stores');
const {gameGenresTableReset} = require('../join-tables/GameGenres');
const {gamePlatformsTableReset} = require('../join-tables/GamePlatforms');
const {gameStoresTableReset} = require('../join-tables/GameStores');   
const sql = require('../utilities/postgres.server');

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