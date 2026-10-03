# Supabase setup (Themalikkara)

Copy `.env.example` → `.env` and set values from **Project Settings → API** in the Supabase dashboard.

## 1. Environment variables

| Variable | Where it goes |
| --- | --- |
| `VITE_SUPABASE_URL` | Frontend (Vite) — Netlify build env |
| `VITE_SUPABASE_ANON_KEY` | Frontend (Vite) — Netlify build env |
| `SUPABASE_SERVICE_ROLE_KEY` | **Local only** — never Netlify `VITE_*` |
| `SUPABASE_PROJECT_REF` | MCP URL / local scripts |

Restart `npm run dev` after changing `.env`.

## 2. Database schema

Migrations in `supabase/migrations/`:

- `001_festival_finance` — tables + RLS  
- `002_realtime_publication` — live dashboard updates  

Apply via Supabase SQL Editor or Supabase MCP.

## 3. Admin authentication

1. Supabase → **Authentication → Users** → create admin (email + password).  
2. Open `/admin` and sign in.  
3. Public read; writes require authenticated session.

## 4. Cursor MCP

Set `YOUR_PROJECT_REF` in `.cursor/mcp.json` (Project ID in Supabase settings), then authenticate Supabase in **Cursor → Settings → MCP**.

Do **not** commit real keys or `.env`.

## 5. Netlify

- Build: `npm run build`, publish `dist`  
- Env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` only (remove service role / access token from Netlify if present)  
- SPA routing: `public/_redirects` and `netlify.toml` in this repo  

After deploy, add your Netlify URL under Supabase **Authentication → URL configuration**.
