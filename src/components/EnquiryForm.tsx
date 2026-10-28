import { useRef, useState, type FormEvent } from 'react'
import {
  LIMITS,
  OTHER_SERVICE,
  SERVICE_OPTIONS,
  normalise,
  validate,
  type EnquiryErrors,
  type EnquiryInput,
} from '../../shared/enquiry'
import { SITE, waLink } from '../data/site'
import { Button, WhatsAppIcon } from './ui'

type Status = 'idle' | 'sending' | 'success' | 'error'

const empty: Record<keyof EnquiryInput, string> = {
  name: '',
  phone: '',
  email: '',
  service: '',
  location: '',
  budget: '',
  message: '',
}

function whatsappSummary(v: Record<keyof EnquiryInput, string>): string {
  const lines = [
    SITE.waMessage,
    '',
    v.name && `Name: ${v.name}`,
    v.phone && `Phone: ${v.phone}`,
    v.service && `Service: ${v.service}`,
    v.location && `Location: ${v.location}`,
    v.budget && `Budget: ${v.budget}`,
    v.message && `Details: ${v.message}`,
  ].filter(Boolean)
  return lines.join('\n')
}

const field =
  'mt-1.5 block w-full border border-charcoal/30 bg-white px-4 py-3 text-base text-charcoal placeholder:text-charcoal/40 focus:border-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-orange aria-[invalid=true]:border-red-700'

export default function EnquiryForm({ defaultService = '' }: { defaultService?: string }) {
  const [values, setValues] = useState({ ...empty, service: defaultService })
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverMsg, setServerMsg] = useState('')
  const startedAt = useRef(Date.now())
  const summaryRef = useRef<HTMLDivElement>(null)

  const set =
    (k: keyof EnquiryInput) =>
    (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [k]: e.target.value }))
      if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
    }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const form = new FormData(e.currentTarget)
    const clean = normalise(values)
    const found = validate(clean)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('idle')
      const first = Object.keys(found)[0]
      document.getElementById(`f-${first}`)?.focus()
      return
    }

    setStatus('sending')
    setServerMsg('')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...clean, website: form.get('website') ?? '', _t: startedAt.current }),
      })
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string; fields?: EnquiryErrors }
        | null

      if (res.ok && data?.ok) {
        setStatus('success')
        setValues({ ...empty })
        requestAnimationFrame(() => summaryRef.current?.focus())
        return
      }
      if (data?.error === 'validation' && data.fields) {
        setErrors(data.fields)
        setServerMsg('Please check the highlighted fields.')
      } else if (data?.error === 'rate_limited') {
        setServerMsg('Too many attempts. Please wait a few minutes, or contact us on WhatsApp.')
      } else if (data?.error === 'not_configured' || res.status === 404) {
        setServerMsg('Online enquiries are not switched on yet. Please send your details on WhatsApp or call us.')
      } else {
        setServerMsg('We could not send your enquiry. Please try again, or contact us on WhatsApp or by phone.')
      }
    } catch {
      setServerMsg('Network problem: your enquiry was not sent. Please try again, or use WhatsApp or phone.')
    }
    setStatus('error')
    requestAnimationFrame(() => summaryRef.current?.focus())
  }

  if (status === 'success') {
    return (
      <div ref={summaryRef} tabIndex={-1} role="status" className="border-l-4 border-orange bg-mist p-8 outline-none">
        <h3 className="text-3xl text-navy">Enquiry received</h3>
        <p className="mt-3 text-charcoal/80">
          Thank you. Your enquiry has been delivered to {SITE.name}. We will contact you on the phone number you gave.
        </p>
        <Button className="mt-6" variant="dark" to="/services">
          Browse our services
        </Button>
      </div>
    )
  }

  const err = (k: keyof EnquiryInput) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-1.5 text-sm font-medium text-red-700">
        {errors[k]}
      </p>
    ) : null
  const aria = (k: keyof EnquiryInput) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `e-${k}` : undefined,
  })

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="form-status">
      <div id="form-status" ref={summaryRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {status === 'error' && (
          <div role="alert" className="border-l-4 border-red-700 bg-red-50 p-5 text-sm text-red-900">
            <p className="font-semibold">{serverMsg}</p>
            <a
              href={waLink(whatsappSummary(values))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-semibold text-[#117a3a] underline"
            >
              <WhatsAppIcon className="h-4 w-4" /> Send these details on WhatsApp instead
            </a>
          </div>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="text-sm font-semibold text-navy">
            Full name <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input id="f-name" required autoComplete="name" maxLength={LIMITS.name} className={field} value={values.name} onChange={set('name')} {...aria('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="f-phone" className="text-sm font-semibold text-navy">
            Phone number <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input id="f-phone" required type="tel" inputMode="tel" autoComplete="tel" maxLength={LIMITS.phone} placeholder="+254 7XX XXX XXX" className={field} value={values.phone} onChange={set('phone')} {...aria('phone')} />
          {err('phone')}
        </div>
        <div>
          <label htmlFor="f-email" className="text-sm font-semibold text-navy">
            Email address <span className="font-normal text-charcoal/60">(optional)</span>
          </label>
          <input id="f-email" type="email" autoComplete="email" maxLength={LIMITS.email} className={field} value={values.email} onChange={set('email')} {...aria('email')} />
          {err('email')}
        </div>
        <div>
          <label htmlFor="f-service" className="text-sm font-semibold text-navy">
            Service required <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <select id="f-service" required className={field} value={values.service} onChange={set('service')} {...aria('service')}>
            <option value="">Select a service…</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === OTHER_SERVICE ? OTHER_SERVICE : s}
              </option>
            ))}
          </select>
          {err('service')}
        </div>
        <div>
          <label htmlFor="f-location" className="text-sm font-semibold text-navy">
            Project location <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input id="f-location" required autoComplete="off" maxLength={LIMITS.location} placeholder="Town / area" className={field} value={values.location} onChange={set('location')} {...aria('location')} />
          {err('location')}
        </div>
        <div>
          <label htmlFor="f-budget" className="text-sm font-semibold text-navy">
            Estimated budget <span className="font-normal text-charcoal/60">(optional)</span>
          </label>
          <input id="f-budget" autoComplete="off" maxLength={LIMITS.budget} placeholder="e.g. KES 500,000" className={field} value={values.budget} onChange={set('budget')} {...aria('budget')} />
        </div>
      </div>

      <div>
        <label htmlFor="f-message" className="text-sm font-semibold text-navy">
          Project description <span aria-hidden="true" className="text-red-700">*</span>
        </label>
        <textarea id="f-message" required rows={5} maxLength={LIMITS.message} className={field} value={values.message} onChange={set('message')} {...aria('message')} />
        {err('message')}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex min-h-12 items-center justify-center bg-navy px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-orange hover:text-navy-900 disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
        <a
          href={waLink(whatsappSummary(values))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 border border-charcoal/30 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:border-[#1ea952] hover:text-[#117a3a]"
        >
          <WhatsAppIcon className="h-4 w-4" /> Or send via WhatsApp
        </a>
      </div>
      <p className="text-xs text-charcoal/60">
        We use your details only to respond to your enquiry. Fields marked * are required.
      </p>
    </form>
  )
}
