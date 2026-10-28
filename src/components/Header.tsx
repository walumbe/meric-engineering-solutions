import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, QUOTE_LINK, SITE, telLink, waLink } from '../data/site'
import { Container, PhoneIcon, WhatsAppIcon } from './ui'

function Logo({ onDark = true }: { onDark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label={`${SITE.name} – home`}>
      <span
        className="flex h-11 w-11 items-center justify-center bg-orange font-display text-2xl font-bold text-navy-900"
        aria-hidden="true"
      >
        M
      </span>
      <span className={`leading-none ${onDark ? 'text-white' : 'text-navy'}`}>
        <span className="block font-display text-2xl font-bold uppercase tracking-wide">Meric</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
          Engineering Solutions Ltd
        </span>
      </span>
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-semibold uppercase tracking-wider transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-orange after:transition-transform ${
      isActive ? 'text-white after:scale-x-100' : 'text-white/80 after:scale-x-0 hover:text-white hover:after:scale-x-100'
    }`

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-[0_1px_0_rgba(255,255,255,0.08)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-orange focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-900"
      >
        Skip to content
      </a>

      <div className="hidden bg-navy-900 text-xs text-white/75 lg:block">
        <Container className="flex h-9 items-center justify-between">
          <span>Construction, engineering and property improvement · Kenya</span>
          <span className="flex items-center gap-6">
            <a href={telLink} className="flex items-center gap-1.5 hover:text-orange">
              <PhoneIcon className="h-3.5 w-3.5" /> {SITE.phoneDisplay}
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-orange">
              <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </span>
        </Container>
      </div>

      <Container className="flex h-[72px] items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>
              {n.label}
            </NavLink>
          ))}
          <Link
            to={QUOTE_LINK}
            className="bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wider text-navy-900 transition-colors hover:bg-white"
          >
            Request a Quote
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6" aria-hidden="true">
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${open ? 'top-[7px] rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-[7px] h-0.5 w-6 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${open ? 'top-[7px] -rotate-45' : 'top-[14px]'}`} />
          </span>
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full grid bg-navy transition-[grid-template-rows,visibility] duration-300 lg:hidden ${
          open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobile" className="flex max-h-[calc(100dvh-72px)] flex-col overflow-y-auto border-t border-white/10 px-5 pb-6 pt-2">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `border-b border-white/10 py-4 font-display text-2xl font-semibold uppercase tracking-wide ${
                    isActive ? 'text-orange' : 'text-white'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link
              to={QUOTE_LINK}
              className="mt-5 bg-orange px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-navy-900"
            >
              Request a Quote
            </Link>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm font-semibold">
              <a href={telLink} className="flex items-center justify-center gap-2 border border-white/30 py-3.5 text-white">
                <PhoneIcon className="h-4 w-4" /> Call
              </a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#1ea952] py-3.5 text-white">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
