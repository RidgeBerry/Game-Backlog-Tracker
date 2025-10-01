const sql = require('../utilities/postgres.server');
const { v4: uuidv4 } = require('uuid');
const { 
    platformsTableReset,
    addPlatform,    
    getPlatformById,
    getPlatformByName,
    getAllPlatforms
} = require('../tables/Platforms');

async function runPlatformsTests() {
  try {
    console.log("Resetting platforms table...");
    await platformsTableReset();

    // --- Test 1: addPlatform ---
    const platformId = uuidv4();
    const platform = { id: platformId, name: "PC" };
    const inserted = await addPlatform(platform);
    console.log("Inserted platform:", inserted);

    // --- Test 2: getPlatformById ---
    const fetchedById = await getPlatformById(platformId);
    console.log("Fetched by ID:", fetchedById);

    // --- Test 3: getPlatformByName ---
    const fetchedByName = await getPlatformByName("PC");
    console.log("Fetched by Name:", fetchedByName);

    // --- Test 4: getAllPlatforms ---
    const allPlatforms = await getAllPlatforms();
    console.log("All platforms:", allPlatforms);

    // --- Test 5: uniqueness constraint ---
    try {
      console.log("Trying to insert duplicate name...");
      await addPlatform({ id: uuidv4(), name: "PC" });
    } catch (err: any) {
      console.log("Duplicate name insert failed as expected:", err.message);
    }

  } catch (err) {
    console.error("Test failed:", err);
  }
}
module.exports = { runPlatformsTests };