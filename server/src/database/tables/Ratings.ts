const sql = require('./postgres.server');
import type { Rating } from '../types/rating';

async function getRatingById(ratingId: string) {
    const rating = await sql`SELECT * FROM ratings WHERE id = ${ratingId}`;
    return rating;
}
async function getRatingByName(name: string){
    const rating = await sql`SELECT * FROM ratings WHERE name = ${name}`;
    return rating;
}
async function getAllRatings(){
    const ratings = await sql`SELECT * FROM ratings`;
    return ratings;
}
async function addRating(rating: Rating){
    const result = await sql`INSERT INTO ratings (id, name) VALUES (${rating.id}, ${rating.name}) RETURNING *`;
    return result;
}
async function ratingsTableReset(){
    await sql`DROP TABLE IF EXISTS public.ratings CASCADE`;
    await sql`CREATE TABLE ratings(
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
    );`;
}   

module.exports = {
    getRatingById,
    getRatingByName,
    getAllRatings,
    addRating,
    ratingsTableReset
};