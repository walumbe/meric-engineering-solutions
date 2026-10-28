import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { telLink, waLink } from '../data/site'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
        light ? 'text-orange' : 'text-orange-600'
      }`}
    >
      <span className="h-px w-8 bg-current" aria-hidden="true" />
      {children}
    </p>
  )
}

type ButtonProps = {
  to?: string
  href?: string
  variant?: 'primary' | 'ghost' | 'dark' | 'whatsapp'
  children: ReactNode
  className?: string
  external?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 min-h-12'
const variants = {
  primary: 'bg-orange text-navy-900 hover:bg-white',
  ghost: 'border border-white/60 text-white hover:bg-white hover:text-navy',
  dark: 'bg-navy text-white hover:bg-orange hover:text-navy-900',
  whatsapp: 'bg-[#1ea952] text-white hover:bg-[#178a43]',
}

export function Button({ to, href, variant = 'primary', children, className = '', external }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.89.92-3-.2-.31a8.2 8.2 0 1 1 6.86 3.75Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.17-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.52.6.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}

export function PhoneIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
    </svg>
  )
}

export function WhatsAppButton({ message, className = '', label = 'Chat on WhatsApp' }: { message?: string; className?: string; label?: string }) {
  return (
    <Button href={waLink(message)} variant="whatsapp" external className={className}>
      <WhatsAppIcon />
      {label}
    </Button>
  )
}

export function CallButton({ className = '', variant = 'dark' as ButtonProps['variant'] }) {
  return (
    <Button href={telLink} variant={variant} className={className}>
      <PhoneIcon />
      Call +254 723 274623
    </Button>
  )
}

/** Small honest label used on every stock photograph shown as a project/example. */
export function IllustrativeTag({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy ${className}`}
    >
      Illustrative example
    </span>
  )
}
