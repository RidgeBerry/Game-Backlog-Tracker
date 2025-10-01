const sql = require('../utilities/postgres.server');
import type { Genre } from '../types/genre';

async function getGenreById(genreId: string) {
    const genre = await sql`SELECT * FROM genres WHERE id = ${genreId}`;
    return genre;
}

async function getGenreByName(name: string){
    const genre = await sql`SELECT * FROM genres WHERE name = ${name}`;
    return genre;
}

async function getAllGenres(){
    const genres = await sql`SELECT * FROM genres`;
    return genres;
}

async function addGenre(genre: Genre){
    const result =await sql`INSERT INTO genres (id, name) VALUES (${genre.id}, ${genre.name})`;
}

async function genresTableReset(){
    await sql`DROP TABLE IF EXISTS public.genres CASCADE`;
    await sql`CREATE TABLE genres(
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
    );`;
}

module.exports = {
    getGenreById,
    getGenreByName,
    getAllGenres,
    addGenre,
    genresTableReset
};