const sql = require('../utilities/postgres.server');
import type { Genre } from '../types/genre';
import type { GameGenre } from '../types/gamegenre';
import type { Game } from '../types/game';

async function getGameByGenre(genreId: string) {
    const games = await sql`SELECT * FROM games WHERE id IN (SELECT game_id FROM game_genres WHERE genre_id = ${genreId})`;
    return games;
}

async function getGenresByGame(gameId: string){
    const genres = await sql`SELECT * FROM genres WHERE id IN (SELECT genre_id FROM game_genres WHERE game_id = ${gameId})`;
    return genres;
}

async function addGameGenre(gameId: string, genreId: string){
    const result = await sql`INSERT INTO game_genres (game_id, genre_id) VALUES ( ${gameId}, ${genreId}) RETURNING *`;
    return result;
}

async function gameGenresTableReset(){
    await sql`DROP TABLE IF EXISTS public.game_genres CASCADE`;
    await sql`CREATE TABLE game_genres(
        game_id TEXT REFERENCES games(id) ON DELETE CASCADE,
        genre_id TEXT REFERENCES genres(id) ON DELETE CASCADE,
        PRIMARY KEY (game_id, genre_id)
    );`;
}

module.exports = {
    getGameByGenre,
    getGenresByGame,
    addGameGenre,
    gameGenresTableReset
};