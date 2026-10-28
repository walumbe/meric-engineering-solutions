/**
 * Vercel Function: POST /api/enquiry
 *
 * Validates and sanitises the enquiry on the server, applies spam protection (honeypot,
 * minimum fill time, per-IP rate limit, body size cap, optional origin allow-list) and delivers
 * it by email through Resend. Nothing is reported as "sent" unless Resend accepted the message.
 *
 * Required environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY        API key from resend.com
 *   ENQUIRY_TO_EMAIL      the inbox that should receive enquiries (supplied by the company)
 *   ENQUIRY_FROM_EMAIL    a sender on a domain verified in Resend, e.g. "Meric Website <enquiries@yourdomain>"
 * Optional:
 *   ALLOWED_ORIGIN        e.g. https://www.yourdomain.co.ke (rejects cross-site posts)
 */
import { normalise, validate } from '../shared/enquiry'

const MAX_BODY_BYTES = 12_000
const MIN_FILL_MS = 3_000
const WINDOW_MS = 10 * 60_000
const MAX_PER_WINDOW = 5

// Best-effort limiter: memory is per serverless instance. For stronger protection add Vercel's
// WAF rate limiting or an Upstash/Redis counter (see README).
const hits = new Map<string, number[]>()

function limited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5_000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
  return recent.length > MAX_PER_WINDOW
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin')
  const allowed = process.env.ALLOWED_ORIGIN
  if (allowed && origin && origin !== allowed) return json({ ok: false, error: 'forbidden' }, 403)

  if (!(request.headers.get('content-type') ?? '').includes('application/json')) {
    return json({ ok: false, error: 'bad_request' }, 415)
  }

  const text = await request.text()
  if (text.length > MAX_BODY_BYTES) return json({ ok: false, error: 'too_large' }, 413)

  let raw: Record<string, unknown>
  try {
    const parsed: unknown = JSON.parse(text)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('shape')
    raw = parsed as Record<string, unknown>
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400)
  }

  const ip = (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim()
  if (limited(ip)) return json({ ok: false, error: 'rate_limited' }, 429)

  // Spam traps: bots fill the hidden field or submit instantly. Pretend success, deliver nothing.
  const startedAt = Number(raw._t)
  const tooFast = !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS
  if ((typeof raw.website === 'string' && raw.website.length > 0) || tooFast) return json({ ok: true })

  const data = normalise(raw)
  const errors = validate(data)
  if (Object.keys(errors).length) return json({ ok: false, error: 'validation', fields: errors }, 422)

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_TO_EMAIL
  const from = process.env.ENQUIRY_FROM_EMAIL
  if (!apiKey || !to || !from) return json({ ok: false, error: 'not_configured' }, 503)

  const rows: [string, string][] = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email || '—'],
    ['Service', data.service],
    ['Location', data.location],
    ['Budget', data.budget || '—'],
  ]
  const html =
    `<h2>New website enquiry</h2><table cellpadding="6">` +
    rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join('') +
    `</table><h3>Project description</h3><p style="white-space:pre-wrap">${esc(data.message)}</p>`
  const plain = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n${data.message}`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        ...(data.email ? { reply_to: data.email } : {}),
        subject: `New enquiry: ${data.service} – ${data.name}`.replace(/[\r\n]/g, ' ').slice(0, 150),
        html,
        text: plain,
      }),
    })
    if (!res.ok) {
      console.error('enquiry delivery failed', res.status) // status only: no personal data in logs
      return json({ ok: false, error: 'delivery_failed' }, 502)
    }
  } catch {
    console.error('enquiry delivery error')
    return json({ ok: false, error: 'delivery_failed' }, 502)
  }

  return json({ ok: true })
}

export function GET(): Response {
  return json({ ok: false, error: 'method_not_allowed' }, 405)
}
