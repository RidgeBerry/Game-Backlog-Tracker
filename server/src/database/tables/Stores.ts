const sql = require('./postgres.server');
import type { Store } from '../types/store';


async function getStoreById(storeId:string){
    const store = await sql`SELECT * FROM stores WHERE id = ${storeId}`;
    return store;
}
async function getStoreByName(name:string){
    const store = await sql`SELECT * FROM stores WHERE name = ${name}`;
    return store;
}
async function getAllStores(){
    const stores = await sql`SELECT * FROM stores`;
    return stores;
}
async function addStore(store: Store){
    const result = await sql`INSERT INTO stores (id, name) VALUES (${store.id}, ${store.name}) RETURNING *`;
    return result;
}
async function storesTableReset(){
    await sql`DROP TABLE IF EXISTS public.stores CASCADE`;  
    await sql`CREATE TABLE stores(
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
    );`;
}

module.exports = {
    getStoreById,
    getStoreByName,
    getAllStores,
    addStore,
    storesTableReset
};
