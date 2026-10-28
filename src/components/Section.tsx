import type { ReactNode } from 'react'
import { Container, Eyebrow } from './ui'

export function SectionHead({ eyebrow, title, children, light = false, className = '' }: { eyebrow: string; title: string; children?: ReactNode; light?: boolean; className?: string }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`text-4xl sm:text-5xl lg:text-6xl ${light ? 'text-white' : 'text-navy'}`}>{title}</h2>
      {children && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-white/80' : 'text-charcoal/80'}`}>{children}</p>}
    </div>
  )
}

export function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 -z-10">{image}</div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/30" />
      <Container className="py-20 sm:py-28 lg:py-36">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="fade-up max-w-4xl text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="fade-up mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{text}</p>
      </Container>
    </section>
  )
}
