import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Img from '../components/Img'
import { PageHero, Section } from '../components/Section'
import { Button, WhatsAppButton } from '../components/ui'
import { SERVICES, SERVICE_GROUPS } from '../data/services'
import { waLink } from '../data/site'

export default function Services() {
  return (
    <>
      <Seo
        title="Our Services"
        description="Construction, plumbing, electrical, interior finishing, painting, tiling, roofing, ceilings, glazing, landscaping, renovation and building maintenance by Meric Engineering Solutions Limited."
      />
      <PageHero
        eyebrow="Our services"
        title="Everything Your Building Project Needs"
        text="Twelve connected service areas, coordinated by one company. Find the service you need below, or tell us about your project and we will advise."
        image={<Img image="construction" priority />}
      />

      <Section id="all-services" className="pb-8 sm:pb-8">
        <nav aria-label="Service groups and services">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-600">Jump to a service</p>
          <ul className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="inline-flex min-h-11 items-center border border-navy/25 px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {SERVICE_GROUPS.map((group) => (
        <div key={group}>
          <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-10">
            <h2 className="border-b-2 border-navy pb-3 text-3xl text-navy sm:text-4xl">{group}</h2>
          </div>
          {SERVICES.filter((s) => s.group === group).map((s, i) => (
            <section key={s.slug} id={s.slug} className="scroll-mt-24 py-12 sm:py-16">
              <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
                <div className={`relative aspect-[4/3] overflow-hidden bg-navy ${i % 2 ? 'lg:order-2' : ''}`}>
                  <Img image={s.image} sizes="(min-width:1024px) 45vw, 100vw" />
                </div>
                <div>
                  <h3 className="text-4xl text-navy sm:text-5xl">{s.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-charcoal/85 sm:text-lg">{s.description}</p>
                  <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Typical work covered</h4>
                  <ul className="mt-3 space-y-2">
                    {s.covers.map((c) => (
                      <li key={c} className="flex gap-3 text-sm text-charcoal">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-orange" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button to={`/contact?service=${encodeURIComponent(s.title)}#enquiry`} variant="dark">Request a quotation</Button>
                    <Button href={waLink(`Hello Meric Engineering Solutions Limited, I would like to enquire about ${s.title}.`)} variant="whatsapp" external>
                      WhatsApp us
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      ))}

      <Section className="bg-navy text-white">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl">Not sure which service you need?</h2>
            <p className="mt-3 max-w-xl text-white/80">Describe the problem or the plan. We will help you work out the scope.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/contact#enquiry">Request a Quote</Button>
            <WhatsAppButton />
          </div>
        </div>
        <p className="mt-8 text-sm text-white/60">
          Prefer to see examples first? Browse the <Link to="/projects" className="underline hover:text-orange">project gallery</Link>.
        </p>
      </Section>
    </>
  )
}
