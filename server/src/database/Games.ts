const sql = require('./postgres.server');
import type { Game } from './game.ts';

async function getGame(gameId: string){
    const game = await sql`SELECT * FROM games WHERE id = ${gameId}`;
    return game;
}

async function addGame(game: Game) {
    let rawg_id = game.rawg_id;
    let slug = game.slug;
    let name = game.name;
    let released = game.released;
    let playtime = game.playtime;
    let background_image = game.background_image;
    let metacritic = game.metacritic;
    let created_at = game.created_at;
    let id = game.id;
    const result = await sql`INSERT INTO games (rawg_id, slug, name, released, playtime, background_image, metacritic, created_at, id) VALUES (${rawg_id}, ${slug}, ${name}, ${released}, ${playtime}, ${background_image}, ${metacritic}, ${created_at}, ${id}) RETURNING *`;
    return result;
}


async function gameTableReset() {
    await sql`DROP TABLE IF EXISTS public.games CASCADE`;

    await sql`CREATE TABLE games(
        id TEXT PRIMARY KEY,
        rawg_id INTEGER NOT NULL,
        slug TEXT,
        name TEXT,
        released DATE ,
        playtime INTEGER ,
        background_image TEXT ,
        metacritic INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

}

module.exports = {
    getGame,
    addGame,
    gameTableReset
};

