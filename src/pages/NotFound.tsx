import Seo from '../components/Seo'
import { Section } from '../components/Section'
import { Button } from '../components/ui'

export default function NotFound() {
  return (
    <Section className="min-h-[60vh]">
      <Seo title="Page not found" description="The page you were looking for could not be found." />
      <meta name="robots" content="noindex" />
      <p className="font-display text-8xl text-orange">404</p>
      <h1 className="mt-2 text-5xl text-navy">Page not found</h1>
      <p className="mt-4 max-w-md text-charcoal/80">That page does not exist or has moved. Try one of these instead.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/" variant="dark">Home</Button>
        <Button to="/services" variant="dark">Our Services</Button>
        <Button to="/contact">Contact Us</Button>
      </div>
    </Section>
  )
}
