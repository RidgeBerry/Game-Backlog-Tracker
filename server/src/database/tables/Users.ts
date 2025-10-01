const sql = require('../utilities/postgres.server');
import type { User } from '../types/user';

async function getUserById(userId: string) {
    const user = await sql`SELECT * FROM users WHERE id = ${userId}`;
    return user;
}
async function getUserByUsername(username: string){
    const user = await sql`SELECT * FROM users WHERE username = ${username}`;
    return user;
}

async function addUser(user: User) {
    let username = user.username;
    let password = user.password;
    let email = user.email;
    let id = user.id;
    let created_at = user.created_at;
    const result = await sql`INSERT INTO users (username, password, email, id, created_at) VALUES (${username}, ${password}, ${email}, ${id}, ${created_at}) RETURNING *`;
    return result;
}

async function deleteUser(userId: string, username: string){
    const result = await sql`DELETE FROM users WHERE id = ${userId} AND username = ${username} RETURNING *`;
    return result;
}

async function updateUser(user: User){
    let username = user.username;
    let password = user.password;
    let email = user.email;
    let id = user.id;
    let created_at = user.created_at;
    const result = await sql`UPDATE users SET username = ${username}, password = ${password}, email = ${email}, created_at = ${created_at} WHERE id = ${id} RETURNING *`;
    return result;
}

async function userTableReset() {
    await sql`DROP TABLE IF EXISTS public.users CASCADE`;
    await sql`CREATE TABLE users(
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
}

module.exports = {
    getUserById,
    getUserByUsername,
    addUser,
    deleteUser,
    updateUser,
    userTableReset
}