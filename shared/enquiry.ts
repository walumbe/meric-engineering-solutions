import { SERVICES } from '../src/data/services'

export const OTHER_SERVICE = 'Other / not sure yet'
export const SERVICE_OPTIONS: string[] = [...SERVICES.map((s) => s.title), OTHER_SERVICE]

export type EnquiryInput = {
  name: string
  phone: string
  email: string
  service: string
  location: string
  budget: string
  message: string
}

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>

export const LIMITS = { name: 100, phone: 20, email: 120, service: 100, location: 120, budget: 60, message: 3000 } as const

/** Trim, remove control characters and collapse whitespace (newlines kept in the message only). */
export function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== 'string') return ''
  // eslint-disable-next-line no-control-regex
  let v = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
  v = multiline ? v.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n') : v.replace(/\s+/g, ' ')
  return v.trim().slice(0, max)
}

export function normalise(raw: Record<string, unknown>): EnquiryInput {
  return {
    name: clean(raw.name, LIMITS.name),
    phone: clean(raw.phone, LIMITS.phone),
    email: clean(raw.email, LIMITS.email),
    service: clean(raw.service, LIMITS.service),
    location: clean(raw.location, LIMITS.location),
    budget: clean(raw.budget, LIMITS.budget),
    message: clean(raw.message, LIMITS.message, true),
  }
}

export function validate(v: EnquiryInput): EnquiryErrors {
  const e: EnquiryErrors = {}
  if (v.name.length < 2) e.name = 'Please enter your full name.'
  if (!/^\+?[0-9][0-9\s-]{7,18}$/.test(v.phone)) e.phone = 'Enter a valid phone number, e.g. 0712 345678 or +254 712 345678.'
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = 'That email address does not look right.'
  if (!SERVICE_OPTIONS.includes(v.service)) e.service = 'Please choose the service you need.'
  if (v.location.length < 2) e.location = 'Please tell us where the project is.'
  if (v.message.length < 10) e.message = 'Please describe your project in a few words (at least 10 characters).'
  return e
}
