const express = require('express');
import type { Request, Response } from 'express';
const dotenv = require('dotenv');
const pool = require("./db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/hello", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Hello from the backend!", dbTime: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});