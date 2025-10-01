const sql = require('../utilities/postgres.server');
const { v4: uuidv4 } = require('uuid');
const {
    ratingsTableReset,
    addRating,
    getRatingById,
    getRatingByName,
    getAllRatings
} = require('../tables/Ratings');

async function runRatingsTests() {
  try {
    console.log("Resetting ratings table...");
    await ratingsTableReset();

    // --- Test 1: addRating ---
    const ratingId = uuidv4();
    const rating = { id: ratingId, name: "Mature" };
    const inserted = await addRating(rating);
    console.log("Inserted rating:", inserted);

    // --- Test 2: getRatingById ---
    const fetchedById = await getRatingById(ratingId);
    console.log("Fetched by ID:", fetchedById);

    // --- Test 3: getRatingByName ---
    const fetchedByName = await getRatingByName("Mature");
    console.log("Fetched by Name:", fetchedByName);

    // --- Test 4: getAllRatings ---
    const allRatings = await getAllRatings();
    console.log("All ratings:", allRatings);

    // --- Test 5: uniqueness constraint ---
    try {
      console.log("Trying to insert duplicate rating...");
      await addRating({ id: uuidv4(), name: "Mature" });
    } catch (err: any) {
      console.log("Duplicate rating insert failed as expected:", err.message);
    }

  } catch (err) {
    console.error("Test failed:", err);
  } 
}
module.exports = { runRatingsTests };