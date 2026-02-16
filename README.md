# 📖 Guestbook App

A full-stack Guestbook application built for Web Programming class.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) |
| Backend | NestJS |
| Database | Supabase (PostgreSQL) |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

## Project Structure

```
webprog-Raniel-guestbook/
├── client/          ← React frontend (Vite)
├── server/          ← NestJS backend
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/guestbook` | List all guestbook posts |
| POST | `/guestbook` | Create a new post (`name`, `message`) |

## Setup & Run Locally

### Backend
```bash
cd server
npm install
npm run start:dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Environment Variables

### Server (`server/.env`)
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
```

### Client (`client/.env`)
```
VITE_API_URL=http://localhost:3000
```

## Deployment

- **Frontend** → Vercel (root directory: `client`)
- **Backend** → Render (root directory: `server`, build: `npm install && npm run build`, start: `npm run start:prod`)

## Author

**Raniel** — BSIT Student