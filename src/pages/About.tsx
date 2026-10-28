import Seo from '../components/Seo'
import Img from '../components/Img'
import { PageHero, Section, SectionHead } from '../components/Section'
import { Button, IllustrativeTag } from '../components/ui'
import { MISSION, VALUES, VISION } from '../data/content'
import { QUOTE_LINK, SITE } from '../data/site'

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Meric Engineering Solutions Limited provides practical construction, engineering and property improvement solutions in Kenya, led by Director Eric Lizinga."
      />
      <PageHero
        eyebrow="About us"
        title="Practical Solutions. Quality Workmanship."
        text="Meric Engineering Solutions Limited brings construction, engineering and property improvement work together under one dependable company."
        image={<Img image="about1" priority />}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead eyebrow="Who we are" title="One Company, The Whole Building" />
            <p className="mt-6 text-base leading-relaxed text-charcoal/85 sm:text-lg">
              {SITE.name} offers integrated services covering construction, plumbing and electrical installations, interior
              finishing, roofing, renovation and ongoing property maintenance for residential, commercial and other
              building projects. The company is led by Director {SITE.director}.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal/85 sm:text-lg">
              Our approach is simple: understand what you need, plan the work sensibly, carry it out with care and walk
              you through the result.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-navy">
            <Img image="about2" sizes="(min-width:1024px) 45vw, 100vw" />
            <IllustrativeTag className="absolute left-3 top-3" />
          </div>
        </div>
      </Section>

      <Section className="bg-mist">
        <div className="grid gap-px bg-navy/15 md:grid-cols-2">
          <div className="bg-white p-8 sm:p-12">
            <h2 className="text-4xl text-navy">Our Mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/85">{MISSION}</p>
          </div>
          <div className="bg-navy p-8 text-white sm:p-12">
            <h2 className="text-4xl">Our Vision</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">{VISION}</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="What guides us" title="Our Values" />
        <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <li key={v.title} className="border-l-4 border-orange pl-5">
              <h3 className="text-2xl text-navy">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/80">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-navy text-white">
        <SectionHead light eyebrow="How we work" title="Our Approach">
          Construction and engineering succeed or fail on planning, coordination and finishing. We commit to three things on every project.
        </SectionHead>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            ['Workmanship', 'Careful setting out, sound methods and a clean finish, checked with you before handover.'],
            ['Safety', 'Safe working practices on site, and installations done to the licensing and safety requirements that apply.'],
            ['Communication', 'Clear scope, clear quotation and regular updates, so there are no surprises.'],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-white/25 pt-5">
              <h3 className="text-3xl text-orange">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12"><Button to={QUOTE_LINK}>Request a Quote</Button></div>
      </Section>
    </>
  )
}
