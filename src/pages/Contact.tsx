import { useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Img from '../components/Img'
import EnquiryForm from '../components/EnquiryForm'
import { Section } from '../components/Section'
import { CallButton, Eyebrow, PhoneIcon, WhatsAppButton } from '../components/ui'
import { SITE, telLink } from '../data/site'
import { SERVICES } from '../data/services'

export default function Contact() {
  const [params] = useSearchParams()
  const requested = params.get('service') ?? ''
  const defaultService = SERVICES.some((s) => s.title === requested) ? requested : ''

  return (
    <>
      <Seo
        title="Contact Us"
        description="Request a quote from Meric Engineering Solutions Limited. Call +254 723 274623, message us on WhatsApp or send a project enquiry."
      />
      <section className="relative isolate overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 -z-10"><Img image="about1" priority /></div>
        <div className="absolute inset-0 -z-10 bg-navy-900/80" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <Eyebrow light>Contact us</Eyebrow>
          <h1 className="fade-up max-w-3xl text-5xl sm:text-6xl lg:text-7xl">Let&apos;s Build Something Great Together.</h1>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 className="text-3xl text-navy sm:text-4xl">Get in touch</h2>
            <dl className="mt-6 space-y-5 text-base">
              <div><dt className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Company</dt><dd className="mt-1 font-medium text-navy">{SITE.name}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Director</dt><dd className="mt-1 font-medium text-navy">{SITE.director}</dd></div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Phone</dt>
                <dd className="mt-1"><a href={telLink} className="inline-flex items-center gap-2 text-2xl font-semibold text-navy hover:text-orange-600"><PhoneIcon className="h-5 w-5" />{SITE.phoneDisplay}</a></dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <CallButton />
              <WhatsAppButton />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-charcoal/70">
              The fastest way to reach us is by phone or WhatsApp. You can also send the form and we will respond to the number you give us.
            </p>
          </div>
          <div id="enquiry" className="scroll-mt-28 bg-mist p-6 sm:p-10">
            <h2 className="text-3xl text-navy sm:text-4xl">Project enquiry</h2>
            <p className="mb-7 mt-2 text-sm text-charcoal/75">Tell us about your project and request a quotation.</p>
            <EnquiryForm key={defaultService} defaultService={defaultService} />
          </div>
        </div>
      </Section>
    </>
  )
}
