// Usage:  node scripts/images.mjs check      -> HEAD-request every Unsplash URL
//         node scripts/images.mjs download   -> save each photo to public/images/<key>.jpg (2000px wide)
// Needs normal internet access. Run on your own computer, then set VITE_SELF_HOSTED_IMAGES=true.
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'

const src = readFileSync(new URL('../src/data/images.ts', import.meta.url), 'utf8')
const entries = [...src.matchAll(/^\s+(\w+):\s*\{\s*id:\s*'([\w-]+)'/gm)].map((m) => ({ key: m[1], id: m[2] }))
const url = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`
const mode = process.argv[2]
if (!['check', 'download'].includes(mode)) { console.error('Use: check | download'); process.exit(1) }

let bad = 0
if (mode === 'download') mkdirSync(new URL('../public/images/', import.meta.url), { recursive: true })
for (const { key, id } of entries) {
  try {
    const res = await fetch(url(id, mode === 'check' ? 200 : 2000), { method: mode === 'check' ? 'HEAD' : 'GET' })
    const ok = res.ok && (res.headers.get('content-type') ?? '').startsWith('image/')
    if (!ok) throw new Error(`HTTP ${res.status}`)
    if (mode === 'download') writeFileSync(new URL(`../public/images/${key}.jpg`, import.meta.url), Buffer.from(await res.arrayBuffer()))
    console.log(`ok    ${key}`)
  } catch (e) { bad++; console.log(`FAIL  ${key} (${id}): ${e.message}`) }
}
console.log(bad ? `\n${bad} of ${entries.length} failed. Replace those IDs in src/data/images.ts.` : `\nAll ${entries.length} images OK.`)
process.exit(bad ? 1 : 0)
