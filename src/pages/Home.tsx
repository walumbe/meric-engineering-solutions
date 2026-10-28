import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Img from '../components/Img'
import ServiceCard from '../components/ServiceCard'
import { Section, SectionHead } from '../components/Section'
import { Button, Container, IllustrativeTag, WhatsAppButton } from '../components/ui'
import { SERVICES } from '../data/services'
import { PROJECTS } from '../data/projects'
import { PROCESS, WHY_US } from '../data/content'
import { TESTIMONIALS } from '../data/testimonials'
import { QUOTE_LINK } from '../data/site'

export default function Home() {
  const featured = [PROJECTS[0], PROJECTS[4], PROJECTS[7], PROJECTS[10], PROJECTS[2], PROJECTS[9]]
  return (
    <>
      <Seo
        title="Meric Engineering Solutions Limited | Construction & Engineering in Kenya"
        description="Meric Engineering Solutions Limited delivers construction, plumbing, electrical, interior finishing, roofing, renovation and building maintenance services in Kenya. Request a quote."
      />

      {/* HERO */}
      <section className="relative isolate flex min-h-[calc(100svh-72px)] items-center overflow-hidden bg-navy-900 text-white lg:min-h-[calc(100svh-108px)]">
        <div className="absolute inset-0 -z-10">
          <Img image="hero" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/90 via-navy-900/65 to-navy-900/25" />
        <Container className="py-20">
          <p className="fade-up mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-orange">
            <span className="h-px w-8 bg-current" aria-hidden="true" /> Meric Engineering Solutions Limited
          </p>
          <h1 className="fade-up max-w-4xl text-[3.4rem] sm:text-7xl lg:text-8xl">
            Building Excellence. <span className="text-orange">Engineering the Future.</span>
          </h1>
          <p className="fade-up mt-7 max-w-2xl text-base leading-relaxed text-white/90 [animation-delay:120ms] sm:text-lg">
            From construction and engineering to interior transformations and property maintenance, Meric Engineering
            Solutions Limited delivers practical solutions for residential, commercial, and other building projects.
          </p>
          <div className="fade-up mt-10 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <Button to={QUOTE_LINK}>Request a Quote</Button>
            <Button to="/services#all-services" variant="ghost">Explore Our Services</Button>
          </div>
        </Container>
        <a
          href="#intro"
          aria-label="Scroll to the introduction"
          className="nudge absolute bottom-6 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center border border-white/40 text-white hover:bg-white/10 sm:flex"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </a>
      </section>

      {/* INTRO */}
      <Section id="intro">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-navy sm:aspect-[5/4] lg:aspect-[4/5]">
              <Img image="intro" sizes="(min-width:1024px) 45vw, 100vw" />
            </div>
            <div className="absolute -bottom-4 -right-0 hidden h-24 w-24 bg-orange sm:block lg:-right-6" aria-hidden="true" />
            <IllustrativeTag className="absolute left-3 top-3" />
          </div>
          <div>
            <SectionHead eyebrow="About Meric" title="Your Trusted Partner for Construction & Engineering Solutions">
              Meric Engineering Solutions Limited offers integrated services covering construction, electrical and plumbing
              installations, interior improvements, and ongoing property maintenance.
            </SectionHead>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-charcoal/80 sm:text-lg">
              Having one company coordinate the different parts of your project means fewer hand-offs, one point of
              contact and work that fits together properly, from the structure to the final finishing touches.
            </p>
            <div className="mt-9"><Button to="/about" variant="dark">About Us</Button></div>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section className="bg-mist" id="services">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow="What we do" title="Our Services">
            Twelve service areas, from foundations to final finishes, so your project can be handled under one roof.
          </SectionHead>
          <Button to="/services" variant="dark" className="self-start md:self-auto">All services</Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </Section>

      {/* WHY */}
      <Section>
        <SectionHead eyebrow="Why Meric" title="Why Choose Us?" />
        <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((w, i) => (
            <li key={w.title} className="border-t-2 border-navy pt-5">
              <span className="font-display text-lg font-semibold text-orange-600" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-1 text-2xl text-navy">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{w.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section className="bg-navy text-white">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead light eyebrow="Service inspiration" title="Featured Work Examples">
            Illustrative photographs showing the kinds of work we undertake. These are stock images, not Meric Engineering
            Solutions Limited projects.
          </SectionHead>
          <Button to="/projects" variant="ghost" className="self-start md:self-auto">View gallery</Button>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link to={`/projects/${p.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-navy-900">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  {p.photo ? <Img src={p.photo.src} alt={p.photo.alt} sizes="(min-width:1024px) 30vw, 100vw" /> : <Img image={p.image} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" />}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/10 to-transparent" />
                {!p.verified && <IllustrativeTag className="absolute left-3 top-3" />}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">{p.category}</p>
                  <h3 className="mt-1 text-2xl text-white">{p.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center"><Button to={QUOTE_LINK}>Discuss Your Project</Button></div>
      </Section>

      {/* PROCESS */}
      <Section>
        <SectionHead eyebrow="How we work" title="Our Working Process" />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {PROCESS.map((s, i) => (
            <li key={s.title} className="relative lg:px-8 lg:first:pl-0 lg:last:pr-0">
              {i > 0 && <span className="absolute left-0 top-6 hidden h-px w-full -translate-x-1/2 bg-navy/15 lg:block" aria-hidden="true" />}
              <span className="relative flex h-12 w-12 items-center justify-center bg-navy font-display text-2xl font-bold text-orange" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-5 text-2xl text-navy"><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <div className="absolute inset-0 -z-10"><Img image="cta" sizes="100vw" /></div>
        <div className="absolute inset-0 -z-10 bg-navy-900/80" />
        <Container className="text-center">
          <h2 className="mx-auto max-w-3xl text-4xl sm:text-6xl">Planning a Construction or Renovation Project?</h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            Let&apos;s discuss your requirements and work out a solution that fits your project.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to={QUOTE_LINK}>Request a Quote</Button>
            <WhatsAppButton />
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS / SERVICE APPROACH */}
      {TESTIMONIALS.length > 0 ? (
        <Section>
          <SectionHead eyebrow="Client feedback" title="What Our Clients Say" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <li key={t.name} className="bg-mist p-7">
                <blockquote className="text-base leading-relaxed text-charcoal">“{t.quote}”</blockquote>
                <p className="mt-5 font-semibold text-navy">{t.name}</p>
                {t.detail && <p className="text-sm text-charcoal/70">{t.detail}</p>}
              </li>
            ))}
          </ul>
        </Section>
      ) : (
        <Section className="bg-mist">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <SectionHead eyebrow="Our approach" title="How We Treat Every Client" />
            <div className="grid gap-8 sm:grid-cols-2">
              {[
                ['Listen first', 'We start by understanding what you need the building to do, before recommending how to do it.'],
                ['Be straightforward', 'Plain-language advice, and a quotation based on the scope we have agreed with you.'],
                ['Care about the finish', 'The details you will see and touch every day get the same attention as the structure.'],
                ['Stay in touch', 'You are kept informed through the project and walked through the completed work at handover.'],
              ].map(([t, d]) => (
                <div key={t}>
                  <h3 className="text-2xl text-navy">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/80">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
