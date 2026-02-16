# Personal Profile & Guestbook

This is a full-stack application featuring a **NestJS Backend** and a **React Frontend**, using **Supabase** as the database.

## Project Structure

The project is organized as a monorepo within the `my-profile` directory:

- `backend/`: NestJS application (API).
- `frontend/`: React application (UI).
- `package.json`: Root scripts for Vercel deployment.
- `vercel.json`: Configuration for Vercel routing.

## Prerequisites

- Node.js (v18 or higher recommended)
- Supabase Account and Project
- Vercel Account
- Render Account

## Local Development

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the project root**:
    ```bash
    cd my-profile
    ```
3.  **Setup Environment Variables**:
    Create a `.env` file in `my-profile/backend/` with your Supabase credentials:
    ```env
    SUPABASE_URL=your_supabase_project_url
    SUPABASE_KEY=your_supabase_anon_key
    ```
4.  **Install Dependencies**:
    ```bash
    npm run install-all
    ```
5.  **Start the Backend**:
    In one terminal:
    ```bash
    cd backend
    npm run start:dev
    ```
6.  **Start the Frontend**:
    In another terminal:
    ```bash
    cd frontend
    npm run dev
    ```
    Access the frontend at `http://localhost:5173`.

---

## Deployment: Vercel (Recommended)

This project is pre-configured for Vercel using the `vercel.json` file.

1.  Push your code to a GitHub repository.
2.  Log in to Vercel and click **Add New Project**.
3.  Import your GitHub repository.
4.  **Configure Project**:
    - **Framework Preset**: Select **Other**.
    - **Root Directory**: Select `my-profile` (or `.` if `my-profile` *is* the root of your repo).
    - **Build Command**: `npm run build`
    - **Output Directory**: `frontend/dist`
    - **Install Command**: `npm install`
5.  **Environment Variables**:
    Add the following variables in the Vercel Project Settings:
    - `SUPABASE_URL`: Your Supabase Project URL.
    - `SUPABASE_KEY`: Your Supabase Anon Key.
    - `VITE_API_URL`: `/api/guestbook` (This relative path ensures the frontend communicates with the serverless backend on the same domain).
6.  **Deploy**: Click **Deploy**.

---

## Deployment: Render

For Render, you will deploy the backend as a **Web Service** and the frontend as a **Static Site**.

### Step 1: Deploy Backend (Web Service)

1.  Create a new **Web Service** on Render connected to your repo.
2.  **Root Directory**: `my-profile/backend`
3.  **Build Command**: `npm install && npm run build`
4.  **Start Command**: `npm run start:prod`
5.  **Environment Variables**:
    - `SUPABASE_URL`: Your Supabase Project URL.
    - `SUPABASE_KEY`: Your Supabase Anon Key.
    - `PORT`: 3000 (Optional, Render usually detects this).
6.  **Deploy**.
7.  **Copy the Backend URL** (e.g., `https://my-api.onrender.com`).

### Step 2: Deploy Frontend (Static Site)

1.  Create a new **Static Site** on Render connected to your repo.
2.  **Root Directory**: `my-profile/frontend`
3.  **Build Command**: `npm install && npm run build`
4.  **Publish Directory**: `dist`
5.  **Environment Variables**:
    - `VITE_API_URL`: paste the Backend URL from Step 1 (e.g., `https://my-api.onrender.com/guestbook`).
    *Note: If you use the full URL, you might need to enable CORS for your frontend domain in the backend `main.ts`.*
6.  **Deploy**.

---

## Database Setup (Supabase)

Run the following SQL in your Supabase SQL Editor to create the table:

```sql
create table guestbook (
  id bigint primary key generated always as identity,
  name text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Note: Enable RLS and add policies as needed for security.
alter table guestbook enable row level security;
create policy "Allow public access" on guestbook for all using (true);
```
