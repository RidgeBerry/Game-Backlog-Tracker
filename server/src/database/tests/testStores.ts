const sql = require('../utilities/postgres.server');
const { v4: uuidv4 } = require('uuid');
const {
    storesTableReset,
    addStore,
    getStoreById,
    getStoreByName,
    getAllStores
} = require('../tables/Stores');

async function runStoresTests() {
  try {
    console.log("Resetting stores table...");
    await storesTableReset();

    // --- Test 1: addStore ---
    const storeId = uuidv4();
    const store = { id: storeId, name: "Steam" };
    const inserted = await addStore(store);
    console.log("Inserted store:", inserted);

    // --- Test 2: getStoreById ---
    const fetchedById = await getStoreById(storeId);
    console.log("Fetched by ID:", fetchedById);

    // --- Test 3: getStoreByName ---
    const fetchedByName = await getStoreByName("Steam");
    console.log("Fetched by Name:", fetchedByName);

    // --- Test 4: getAllStores ---
    const allStores = await getAllStores();
    console.log("All stores:", allStores);

    // --- Test 5: uniqueness constraint ---
    try {
      console.log("Trying to insert duplicate store...");
      await addStore({ id: uuidv4(), name: "Steam" });
    } catch (err: any) {
      console.log("Duplicate store insert failed as expected:", err.message);
    }

  } catch (err) {
    console.error("Test failed:", err);
  }
}

module.exports = { runStoresTests };  