// Runs before `vite build`. Writes public/robots.txt and public/sitemap.xml.
// The site URL comes from VITE_SITE_URL, or Vercel's production domain. With neither, robots.txt is
// written without a sitemap line and no sitemap is generated (a sitemap needs absolute URLs).
import { readFileSync, writeFileSync, rmSync } from 'node:fs'

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8')
const env = process.env
let base = env.VITE_SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
base = base.replace(/\/$/, '')

const slugs = (file) => [...read(file).matchAll(/^\s+slug:\s*'([\w-]+)'/gm)].map((m) => m[1])
const paths = ['/', '/about', '/services', '/projects', '/contact', ...slugs('../src/data/projects.ts').map((s) => `/projects/${s}`)]

let robots = 'User-agent: *\nAllow: /\nDisallow: /api/\n'
if (base) {
  robots += `\nSitemap: ${base}/sitemap.xml\n`
  const urls = paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')
  writeFileSync(new URL('../public/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
  console.log(`SEO: sitemap.xml written for ${base} (${paths.length} URLs)`)
} else {
  rmSync(new URL('../public/sitemap.xml', import.meta.url), { force: true })
  console.log('SEO: no site URL set (VITE_SITE_URL); sitemap skipped. Set it in Vercel and redeploy.')
}
writeFileSync(new URL('../public/robots.txt', import.meta.url), robots)
