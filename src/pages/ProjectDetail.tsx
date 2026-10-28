import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Img from '../components/Img'
import { Section } from '../components/Section'
import { Button, IllustrativeTag } from '../components/ui'
import NotFound from './NotFound'
import { PROJECTS } from '../data/projects'
import { SERVICES } from '../data/services'
import { QUOTE_LINK } from '../data/site'

const RELATED: Record<string, string> = {
  Construction: 'general-construction',
  Renovation: 'renovation-and-remodeling',
  Interiors: 'interior-design-and-finishing',
  Engineering: 'plumbing-and-sanitary',
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) return <NotFound />
  const service = SERVICES.find((s) => s.slug === RELATED[project.category])
  const others = PROJECTS.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 3)

  return (
    <>
      <Seo title={project.title} description={project.description} />
      <Section>
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-charcoal/70">
          <Link to="/projects" className="hover:text-orange-600">Projects</Link> <span aria-hidden="true">/</span> <span className="text-navy">{project.title}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-navy">
            {project.photo ? <Img src={project.photo.src} alt={project.photo.alt} priority sizes="(min-width:1024px) 60vw, 100vw" /> : <Img image={project.image} priority sizes="(min-width:1024px) 60vw, 100vw" />}
            {!project.verified && <IllustrativeTag className="absolute left-3 top-3" />}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">{project.category}</p>
            <h1 className="mt-2 text-4xl text-navy sm:text-5xl">{project.title}</h1>
            <p className="mt-5 text-base leading-relaxed text-charcoal/85">{project.description}</p>
            {project.verified && project.details && (
              <ul className="mt-5 space-y-2 text-sm text-charcoal">
                {project.details.map((d) => <li key={d} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-orange" aria-hidden="true" />{d}</li>)}
              </ul>
            )}
            {!project.verified && (
              <p role="note" className="mt-6 border-l-4 border-orange bg-mist p-4 text-sm text-charcoal/85">
                Illustrative example. This is a licensed stock photograph showing the type of work we offer, not a completed Meric Engineering Solutions Limited project.
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to={QUOTE_LINK}>Request a Quote</Button>
              {service && <Button to={`/services#${service.slug}`} variant="dark">Related service</Button>}
            </div>
          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl text-navy">More in {project.category}</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`} className="group block">
                    <span className="relative block aspect-[4/3] overflow-hidden bg-navy">
                      {p.photo ? <Img src={p.photo.src} alt={p.photo.alt} sizes="(min-width:640px) 30vw, 100vw" /> : <Img image={p.image} sizes="(min-width:640px) 30vw, 100vw" />}
                    </span>
                    <span className="mt-3 block font-display text-xl uppercase text-navy group-hover:text-orange-600">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  )
}
