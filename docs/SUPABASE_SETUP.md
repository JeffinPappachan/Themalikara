# Supabase setup (Themalikkara)

Project ref: **hjwtpzxjkxqgmritrlai**  
URL: `https://hjwtpzxjkxqgmritrlai.supabase.co`

## 1. Environment variables

Copy `.env.example` to `.env` and fill in values from **Project Settings → API**:

| Variable | Where it goes |
| --- | --- |
| `VITE_SUPABASE_URL` | Frontend (Vite) |
| `VITE_SUPABASE_ANON_KEY` | Frontend (Vite) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Never** in the frontend — local scripts / server only |
| `SUPABASE_PROJECT_REF` | MCP / CI (optional) |

Restart `npm run dev` after changing `.env`.

## 2. Database schema

Applied on project **hjwtpzxjkxqgmritrlai**:

- `001_festival_finance` — `festival_settings`, `contributions`, RLS  
- `002_realtime_publication` — live updates on the public dashboard  

Local copies: `supabase/migrations/`. Regenerate types: Supabase MCP `generate_typescript_types` → `src/types/database.ts`.

## 3. Admin authentication

1. In Supabase → **Authentication → Users**, create an admin user (email + password).
2. Open `/admin` and sign in with that email and password.
3. RLS allows **public read**; **insert/update/delete** require an authenticated Supabase session.

Until `.env` has Supabase keys, the app falls back to **localStorage** and env-based `/admin` login.

## 4. Cursor MCP

Project files:

- `.cursor/mcp.json` (Cursor project MCP)
- `mcp.json` (same config at repo root)

Both point at:

`https://mcp.supabase.com/mcp?project_ref=hjwtpzxjkxqgmritrlai`

**Authenticate in Cursor:** Settings → MCP → Supabase → connect / sign in with Supabase OAuth.

Do **not** commit `.env` or service role keys to git.
