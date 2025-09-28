const sql = require('./postgres.server');
import type { Backlog } from './backlog';
import type { User } from './user';


async function getBacklog(userID: string){
    const backlog = await sql`SELECT * FROM backlogs WHERE user_id = ${userID}`;
    return backlog;
}

async function addBacklog(backlog: Backlog){
    let id = backlog.id;
    let user_id = backlog.user_id;
    let game_id = backlog.game_id;
    let status = backlog.status;
    let notes = backlog.notes;
    let created_at = backlog.created_at;
    const result = await sql`INSERT INTO backlogs (id, user_id, game_id, status, notes, created_at) VALUES (${id}, ${user_id}, ${game_id}, ${status}, ${notes}, ${created_at}) RETURNING *`;
    return result;
}

async function deleteBacklog(userID: string){
    let user_id = userID;
    const result = await sql`DELETE FROM backlogs WHERE user_id = ${user_id} RETURNING *`;
    return result;
}

async function addGameToBacklog(user: User, gameId: string, status: string, notes: string) {
    const { v4: uuidv4 } = require('uuid');
    let id = uuidv4();
    let user_id = user.id;
    const result = await sql`INSERT INTO backlogs (id, user_id, game_id, status, notes) VALUES (${id}, ${user_id}, ${gameId}, ${status}, ${notes}) RETURNING *`;
    return result;
}

async function deleteFromBacklog(user: User, gameId: string){
    let user_id = user.id;
    const result = await sql`DELETE FROM backlogs WHERE user_id = ${user_id} AND game_id = ${gameId} RETURNING *`;
    return result;
}

async function backlogTableReset() {
    await sql`DROP TABLE IF EXISTS public.backlogs CASCADE`;

    await sql`CREATE TABLE backlogs(
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        game_id TEXT REFERENCES games(id) ON DELETE CASCADE,
        status TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
}

module.exports = {
    getBacklog,
    addBacklog,
    deleteBacklog,
    addGameToBacklog,
    deleteFromBacklog,
    backlogTableReset
}