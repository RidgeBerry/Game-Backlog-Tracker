const sql = require('../utilities/postgres.server');
const { v4: uuidv4 } = require('uuid');
const {
    gameGenresTableReset,
    addGameGenre,
    getGameByGenre,
    getGenresByGame
} = require('../join-tables/GameGenres');
const { genresTableReset } = require('../tables/Genres');
const { gameTableReset } = require('../tables/Games');

async function runGameGenresTests() {
  try {
    console.log("Resetting game_genres table, genres table, and games table...");
    await gameGenresTableReset();
    await genresTableReset();
    await gameTableReset();

    // --- Setup: insert a game + a genre ---
    const gameId = uuidv4();
    const genreId = uuidv4();

    await sql`INSERT INTO games (id, rawg_id, slug, name) VALUES (${gameId}, 123, 'test-game', 'Test Game')`;
    await sql`INSERT INTO genres (id, name) VALUES (${genreId}, 'RPG')`;

    // --- Test 1: addGameGenre ---
    const added = await addGameGenre(gameId, genreId);
    console.log("Added game_genre relation:", added);

    // --- Test 2: getGameByGenre ---
    const gamesByGenre = await getGameByGenre(genreId);
    console.log("Games by genre:", gamesByGenre);

    // --- Test 3: getGenresByGame ---
    const genresByGame = await getGenresByGame(gameId);
    console.log("Genres by game:", genresByGame);

    // --- Test 4: uniqueness / primary key constraint ---
    try {
      console.log("Trying to insert duplicate game_genre...");
      await addGameGenre(gameId, genreId);
    } catch (err: any) {
      console.log("Duplicate insert failed as expected:", err.message);
    }

  } catch (err) {
    console.error("Test failed:", err);
  } 
}

module.exports = { runGameGenresTests };