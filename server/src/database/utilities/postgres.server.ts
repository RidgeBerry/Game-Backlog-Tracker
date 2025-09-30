
const postgres = require('postgres');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DBUSER || !process.env.PGPASSWORD || !process.env.PGHOST || !process.env.PGPORT || !process.env.PGDATABASE) {
    throw new Error("Database environment variables are not all set.");
}

const sql = postgres({
    user: process.env.DBUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT),
    database: process.env.PGDATABASE
})

module.exports = sql;

