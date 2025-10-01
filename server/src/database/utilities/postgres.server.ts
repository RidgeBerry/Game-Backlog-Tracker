
const postgres = require('postgres');
const dotenv = require('dotenv');

dotenv.config();

const databaseName = process.env.NODE_ENV === 'game_backlog_test'
  ? process.env.PGDATABASE_TEST
  : process.env.PGDATABASE;

if (!process.env.DBUSER || !process.env.PGPASSWORD || !process.env.PGHOST || !process.env.PGPORT || !databaseName) {
    throw new Error("Database environment variables are not all set.");
}

const sql = postgres({
    user: process.env.DBUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT),
    database: databaseName
})

module.exports = sql;

