# TODO - Fix backend crashing on Mongo connection failure

- [ ] Edit `backend/config/db.js` to not `process.exit(1)` on Mongo connection failure (graceful retry instead).
- [ ] Re-run `npm run dev` and confirm the backend stays running even when Mongo is unreachable.
- [ ] Inspect/update `backend/.env` `MONGO_URI` and fix MongoDB Atlas network access (IP allowlist/VPN) so the DB connects successfully.

