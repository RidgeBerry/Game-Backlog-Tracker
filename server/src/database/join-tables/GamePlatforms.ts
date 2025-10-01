const sql = require('../utilities/postgres.server');
import type { GamePlatform } from '../types/gameplatform';

async function addGamePlatform(gamePlatform: GamePlatform){
    const result = await sql`INSERT INTO game_platforms (id, platform_id, game_id) VALUES (${gamePlatform.id}, ${gamePlatform.platform_id}, ${gamePlatform.game_id}) RETURNING *`;
    return result;
}

async function getGamesByPlatform(platformId: string) {
    const games = await sql`SELECT * FROM games WHERE id IN (SELECT game_id FROM game_platforms WHERE platform_id = ${platformId})`;
    return games;
}

async function getPlatformsByGame(gameId: string){
    const platforms = await sql`SELECT * FROM platforms WHERE id IN (SELECT platform_id FROM game_platforms WHERE game_id = ${gameId})`;
    return platforms;
}

async function gamePlatformsTableReset(){
    await sql`DROP TABLE IF EXISTS public.game_platforms CASCADE`;
    await sql`CREATE TABLE game_platforms(
        id TEXT PRIMARY KEY,
        platform_id TEXT REFERENCES platforms(id) ON DELETE CASCADE,
        game_id TEXT REFERENCES games(id) ON DELETE CASCADE,
        UNIQUE (platform_id, game_id)
    );`;
}

module.exports = {
    addGamePlatform,
    getGamesByPlatform, 
    getPlatformsByGame,
    gamePlatformsTableReset
};