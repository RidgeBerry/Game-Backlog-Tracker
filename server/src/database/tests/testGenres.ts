const sql = require('../utilities/postgres.server');
const { v4: uuidv4 } = require('uuid');
const { 
    genresTableReset,
    addGenre,
    getGenreById,
    getGenreByName,
    getAllGenres
} = require('../tables/Genres');

async function runGenresTests() {
  try {
    console.log("Resetting genres table...");
    await genresTableReset();

    // --- Test 1: addGenre ---
    const genreId = uuidv4();
    const genre = { id: genreId, name: "RPG" };
    await addGenre(genre);
    console.log("Inserted genre:", genre);

    // --- Test 2: getGenreById ---
    const fetchedById = await getGenreById(genreId);
    console.log("Fetched by ID:", fetchedById);

    // --- Test 3: getGenreByName ---
    const fetchedByName = await getGenreByName("RPG");
    console.log("Fetched by Name:", fetchedByName);

    // --- Test 4: getAllGenres ---
    const allGenres = await getAllGenres();
    console.log("All genres:", allGenres);

    // --- Test 5: uniqueness constraint ---
    try {
      console.log("Trying to insert duplicate name...");
      await addGenre({ id: uuidv4(), name: "RPG" });
    } catch (err: any) {
      console.log("Duplicate name insert failed as expected:", err.message);
    }

  } catch (err) {
    console.error("Test failed:", err);
  } 
}

module.exports = { runGenresTests };