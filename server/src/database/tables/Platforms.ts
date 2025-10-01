const sql = require('../utilities/postgres.server');
import type { Platform } from '../types/platform';

async function getPlatformById(platformId:string){
    const platform = await sql`SELECT * FROM platforms WHERE id = ${platformId}`;
    return platform;
}

async function getPlatformByName(name:string){
    const platform = await sql`SELECT * FROM platforms WHERE name = ${name}`;
    return platform;
}

async function getAllPlatforms(){
    const platforms = await sql`SELECT * FROM platforms`;
    return platforms;
}

async function addPlatform(platform: Platform){
    const result = await sql`INSERT INTO platforms (id, name) VALUES (${platform.id}, ${platform.name}) RETURNING *`;
    return result;
}

async function platformsTableReset(){
    await sql`DROP TABLE IF EXISTS public.platforms CASCADE`;  
    await sql`CREATE TABLE platforms(
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
    );`;
}

module.exports = {
    getPlatformById,
    getPlatformByName,
    getAllPlatforms,
    addPlatform,
    platformsTableReset
};
