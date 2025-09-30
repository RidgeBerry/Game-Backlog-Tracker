const sql = require('./postgres.server');
import type { GameStore } from '../types/gamestore';

async function addGameStore(gameStore: GameStore){
    const result = await sql`INSERT INTO game_stores (id, store_id, game_id) VALUES (${gameStore.id}, ${gameStore.store_id}, ${gameStore.game_id}) RETURNING *`;
    return result;
}

async function getGamesByStore(storeId: string) {
    const games = await sql`SELECT * FROM games WHERE id IN (SELECT game_id FROM game_stores WHERE store_id = ${storeId})`;
    return games;
}
async function getStoresByGame(gameId: string){
    const stores = await sql`SELECT * FROM stores WHERE id IN (SELECT store_id FROM game_stores WHERE game_id = ${gameId})`;
    return stores;
}
async function gameStoresTableReset(){
    await sql`DROP TABLE IF EXISTS public.game_stores CASCADE`;
    await sql`CREATE TABLE game_stores(
        id TEXT PRIMARY KEY,
        store_id TEXT REFERENCES stores(id) ON DELETE CASCADE,
        game_id TEXT REFERENCES games(id) ON DELETE CASCADE,
        UNIQUE (store_id, game_id)
    );`;
}

module.exports = {
    addGameStore,
    getGamesByStore,
    getStoresByGame,
    gameStoresTableReset
};