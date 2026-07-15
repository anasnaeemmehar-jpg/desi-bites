# Deploying DesiBites (Free Tier)

This deploys three pieces:

| Piece | Where | Why |
|---|---|---|
| Backend API | Render (free web service + 1GB persistent disk) | Needs to stay running + keep the SQLite file across deploys |
| Customer site | Vercel | Fast static hosting for the Vite build |
| Admin panel | Vercel (second project) | Same as above |

Total cost: **$0**. Render's free web service sleeps after 15 minutes of inactivity and wakes on the next request (takes ~30–50s to wake up) — fine for a demo/small project, not ideal for a live business without upgrading later.

---

## Prerequisites

1. Push this project to a GitHub repo (Render and Vercel both deploy from Git).
2. Create free accounts at [render.com](https://render.com) and [vercel.com](https://vercel.com) if you don't have them — you can sign in with GitHub directly.

---

## Step 1 — Deploy the backend to Render

### Option A: One-click via `render.yaml` (recommended)

This repo already includes `render.yaml` at the root, which pre-configures the service, the persistent disk, and most environment variables.

1. Go to [dashboard.render.com/blueprints](https://dashboard.render.com/blueprints) → **New Blueprint Instance**.
2. Connect your GitHub repo and select it.
3. Render reads `render.yaml` automatically and shows you the `desibites-backend` service with a 1GB disk mounted at `/var/data`.
4. It will ask you to fill in `ALLOWED_ORIGINS` (marked `sync: false` — meaning you set it manually). Leave it blank for now; you'll come back and set it in Step 3 once you know your Vercel URLs.
5. Click **Apply** / **Create New Resources**. Render will build and deploy.
6. Once live, note your backend URL — something like:
   ```
   https://desibites-backend.onrender.com
   ```
7. **Seed the database once**: Render's Shell tab (in your service dashboard) lets you run one-off commands. Open it and run:
   ```bash
   npm run seed
   ```
   (If you skip this, the app auto-seeds on first boot anyway — see `server.js` — but running it manually lets you confirm it worked and see the default admin credentials in the log.)

### Option B: Manual setup (if you'd rather not use the blueprint)

1. **New +** → **Web Service** → connect your repo.
2. Settings:
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
3. Add a **Disk**: name `desibites-data`, mount path `/var/data`, size `1 GB`.
4. Add environment variables:
   | Key | Value |
   |---|---|
   | `JWT_SECRET` | any long random string |
   | `DB_DIR` | `/var/data` |
   | `UPLOADS_DIR` | `/var/data/uploads` |
   | `ALLOWED_ORIGINS` | *(leave blank for now, set in Step 3)* |
5. Deploy.

---

## Step 2 — Deploy the frontend + admin to Vercel

Do this twice — once per app, since they're separate Vite projects in the same repo.

### Customer site (`frontend/`)

1. [vercel.com/new](https://vercel.com/new) → import your GitHub repo.
2. When asked for the **Root Directory**, click "Edit" and select `frontend`.
3. Framework preset: Vercel should auto-detect **Vite**. Build command `vite build`, output directory `dist` (defaults are fine).
4. Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `VITE_API_URL` | your Render backend URL, e.g. `https://desibites-backend.onrender.com` (no trailing slash) |
5. Deploy. You'll get a URL like `https://desibites-frontend.vercel.app`.

### Admin panel (`admin/`)

Repeat the same process as a **separate Vercel project**:

1. [vercel.com/new](https://vercel.com/new) → import the **same repo again**.
2. Root Directory → `admin`.
3. Same `VITE_API_URL` environment variable, same Render backend URL.
4. Deploy. You'll get something like `https://desibites-admin.vercel.app`.

> Vercel supports importing the same repo multiple times as different projects — each with its own root directory — so this is expected and fine.

---

## Step 3 — Lock down CORS

Now that you have your two Vercel URLs, go back to Render → your backend service → **Environment** → set:

```
ALLOWED_ORIGINS=https://desibites-frontend.vercel.app,https://desibites-admin.vercel.app
```

(Comma-separated, no spaces, no trailing slashes.) Save — Render will redeploy automatically with the new value. This restricts the API to only accept requests from your two frontends instead of any origin.

---

## Step 4 — Verify everything

1. Visit your **backend** health check: `https://<your-backend>.onrender.com/api/health` → should return `{"success":true,...}`.
   - First request after idle time will be slow (Render free tier cold start) — that's expected.
2. Visit your **customer site** → menu should load, images (once you add real ones) should show, cart/checkout/tracking should work end-to-end.
3. Visit your **admin panel** `/login` → sign in with:
   - Email: `admin@desibites.com`
   - Password: `admin123`
   - **Change this password's underlying data or create a new admin and remove this one before treating the site as "live."** Right now there's no in-app way to change an admin's password — you'd update it directly via Render's Shell tab with a small script, or add a settings page for that later.

---

## Common issues

**Frontend loads but the menu is empty / network errors in console.**
`VITE_API_URL` is probably missing, wrong, or doesn't match your actual Render URL. Double check it in Vercel → Project → Settings → Environment Variables, and redeploy after changing it (env var changes need a redeploy to take effect in a static build).

**CORS errors in the browser console.**
Your Vercel URL doesn't match what's in `ALLOWED_ORIGINS` on Render exactly (protocol, no trailing slash, correct subdomain). Update it and let Render redeploy.

**Product images don't show after uploading via admin.**
Confirm `UPLOADS_DIR` is set to `/var/data/uploads` on Render (so uploads land on the persistent disk, not the ephemeral filesystem that resets on redeploy).

**Backend seems to "lose" data after a while.**
If you didn't attach the persistent disk (or `DB_DIR` isn't pointing at it), Render's free web services reset their filesystem on every deploy/restart. Double-check the disk is attached and `DB_DIR=/var/data`.

**First request after inactivity takes 30–50 seconds.**
Normal behavior for Render's free tier — the service spins down after 15 minutes idle and wakes on the next request. Upgrading to a paid instance removes this.
