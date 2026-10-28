import { Link } from 'react-router-dom'
import { NAV, SITE, telLink } from '../data/site'
import { SERVICES } from '../data/services'
import { Container, WhatsAppButton } from './ui'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/75">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div>
          <p className="font-display text-3xl font-bold uppercase tracking-wide text-white">Meric</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange">Engineering Solutions Limited</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Practical construction, engineering and property improvement solutions for residential, commercial and other
            building projects in Kenya.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-4 font-display text-lg text-white">Quick links</h2>
          <ul className="space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-orange">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact#enquiry" className="hover:text-orange">
                Request a Quote
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-display text-lg text-white">Services</h2>
          <ul className="space-y-2.5 text-sm">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className="hover:text-orange">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="font-semibold text-orange hover:text-white">
                View all services →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-display text-lg text-white">Contact</h2>
          <p className="text-sm">
            <span className="block text-white/50">Director</span>
            {SITE.director}
          </p>
          <p className="mt-3 text-sm">
            <span className="block text-white/50">Phone</span>
            <a href={telLink} className="text-base font-semibold text-white hover:text-orange">
              {SITE.phoneDisplay}
            </a>
          </p>
          <WhatsAppButton className="mt-5 w-full sm:w-auto" />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Photographs are licensed stock imagery used for illustration.</p>
        </Container>
      </div>
    </footer>
  )
}
