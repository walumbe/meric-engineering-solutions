# Meric Engineering Solutions Limited: website

React 19 + TypeScript + Vite + Tailwind CSS 4 + React Router. It builds to plain static files (`dist/`), so it
hosts on Vercel's static CDN. The only server code is one small Vercel Function, `api/enquiry.ts`, which delivers
the enquiry form by email.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the build
```
`npm run dev` serves the pages but not `/api/enquiry`; there the form shows its "not switched on" message and the
WhatsApp fallback. To test the form end to end, install the Vercel CLI and run `vercel dev`.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In Vercel: **Add New > Project**, import the repo. The framework preset is detected as **Vite**
   (build `npm run build`, output `dist`). `vercel.json` already handles page refreshes and security headers.
3. Add the environment variables below, then deploy.
4. Add your custom domain under **Settings > Domains**, set `VITE_SITE_URL` to it and redeploy. This turns on
   canonical URLs and generates `sitemap.xml`.

## Make the enquiry form deliver email
Create a free account at [resend.com](https://resend.com), verify the company's sending domain, create an API key,
and set these in Vercel:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key (never in frontend code) |
| `ENQUIRY_TO_EMAIL` | Inbox that receives enquiries. **No email address was supplied, so none is set.** |
| `ENQUIRY_FROM_EMAIL` | Sender on the verified domain |
| `ALLOWED_ORIGIN` | Optional: reject posts from other websites |

Until these are set the form says online enquiries are not switched on and offers WhatsApp. It never shows a false
success message. Protections: server-side validation and sanitising, hidden honeypot field, minimum fill time,
per-IP rate limit (best-effort per instance; add Vercel WAF rate limiting for more), 12 KB body cap, HTML-escaped
emails, and no personal data in logs.

## Photographs: do this before launch
All photos are licensed **Unsplash** stock images (free for commercial use) that illustrate services. They are
labelled "Illustrative example" and are never presented as company projects. The image IDs live in
`src/data/images.ts`.

1. `npm run images:check` confirms every URL resolves. Replace any that fail with another Unsplash photo ID.
2. `npm run images:download` saves them into `public/images/`. Commit them, set `VITE_SELF_HOSTED_IMAGES=true`
   in Vercel, and redeploy. Self-hosting avoids reliance on a third-party image host.
3. If an image fails to load, the site shows a plain navy panel rather than a broken icon.

## Editing content
| What | Where |
|---|---|
| Phone, WhatsApp, director, nav | `src/data/site.ts` |
| Services (title, description, covered work, photo) | `src/data/services.ts` |
| Mission, vision, values, process, "why us" | `src/data/content.ts` |
| Portfolio | `src/data/projects.ts` (see the how-to at the top) |
| Testimonials | `src/data/testimonials.ts` (empty = section replaced by "Our approach") |

**Adding a real project:** put the photo in `public/images/projects/`, add an entry with `verified: true` and a
`photo` field. The gallery, filters, lightbox and detail page update automatically, and the "Illustrative" label
disappears for that item.

**Adding testimonials:** add genuine, permitted quotes to `TESTIMONIALS`; the section appears automatically.

## Before launch checklist
- Confirm Eric Lizinga approves the mission, vision and values wording (they are proposals).
- Confirm quotations are free before changing "Request a Quote" to "Get a Free Quote".
- Add an Open Graph share image (`public/og.jpg` plus an `og:image` tag) once you have a brand photo.
- Do not add an address, email, years of experience or project counts until they are verified.
