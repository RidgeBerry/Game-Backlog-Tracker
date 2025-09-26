const express = require('express');
const dotenv = require('dotenv');
const sql = require('./database/postgres.server');
const { resetDatabase } = require('./database/databasereset');
import type { Request, Response } from 'express';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/hello", async (req: Request, res: Response) => {
  try {
    const result = await sql`SELECT NOW()`;
    const row = Array.isArray(result) ? result[0] : result;
    res.json({ message: "Hello from the backend!", dbTime: row });
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Database query failed", details: (err && (err as Error).message) || undefined });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Protected reset route: only works when the correct secret is provided.
// The route intentionally responds 404 when the secret is missing or incorrect to avoid advertising itself.
app.post('/internal/reset-db', async (req: Request, res: Response) => {
  const provided = req.header('x-reset-key') || (req.query && req.query.key);
  const secret = process.env.RESET_DB_KEY;

  if (!secret || provided !== secret) {
    // Return 404 so the existence of the endpoint is concealed when unauthorized
    return res.status(404).send('Not found');
  }

  try {
    await resetDatabase();
    return res.json({ ok: true, message: 'Database reset completed.' });
  } catch (err) {
    console.error('reset-db error:', err);
    return res.status(500).json({ error: 'Reset failed', details: (err && (err as Error).message) || undefined });
  }
});