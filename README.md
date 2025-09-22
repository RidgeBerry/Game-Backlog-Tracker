# Game-Backlog-Tracker
Full-stack project (React + Node/Express + PostgreSQL) that lets users manage a personal gaming backlog with auto-fetched game data and visualized stats.
Search for games using the RAWG API, add them to your backlog, and track progress with stats like average completion time, achievements, and more.

# Features (Planned & In Progress)
- Game Search – search games by title via the RAWG API
- Stats & Info – average playtime, release date, ratings, etc.
- Personal Backlog – add games and set status: planned, playing, completed, dropped
- Local Database Cache – saves game data to avoid extra API calls

# Tech Stack
Frontend:
- React + TypeScript
- Vite

Backend:
- Node.js + Express
- PostgreSQL (via pg)
- RAWG API (external)
