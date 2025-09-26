const { gameTableReset } = require('./Games.ts');
const sql = require('./postgres.server');

async function resetDatabase() {
    await gameTableReset();
    console.log("Database has been reset.");
}

// Export the function so it can be called from a small runner script or from the server entrypoint
module.exports = { resetDatabase };