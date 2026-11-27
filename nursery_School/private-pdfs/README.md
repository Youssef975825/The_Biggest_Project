# private-pdfs

The downloadable PDFs live here, OUTSIDE `public/`, so Vite/Vercel do not serve them.
The structure mirrors `public/files/` (e.g. `private-pdfs/bees/story-1/worksheet.pdf`).

To bring downloads back (after login + payment exist):
1. Preferably serve them from private storage with signed URLs (Firebase Storage / Supabase Storage).
2. Quick local alternative: move the files back into `public/files/` and set `DOWNLOADS_ENABLED = true` in `src/config.ts`.
   Files in `public/` are reachable by direct URL by anyone, so this is NOT protection.
