import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Img from '../components/Img'
import Lightbox from '../components/Lightbox'
import { PageHero, Section } from '../components/Section'
import { Button, IllustrativeTag } from '../components/ui'
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects'
import { QUOTE_LINK } from '../data/site'

export default function Projects() {
  const [cat, setCat] = useState<string>('All')
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const list = cat === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === cat)
  const hasIllustrative = list.some((p) => !p.verified)

  const step = useCallback(
    (dir: -1 | 1) => setOpenIdx((i) => (i === null ? i : (i + dir + list.length) % list.length)),
    [list.length],
  )

  return (
    <>
      <Seo
        title="Projects"
        description="Browse construction, renovation, interior and engineering examples by category. Images are illustrative until Meric Engineering Solutions Limited project photographs are added."
      />
      <PageHero
        eyebrow="Projects"
        title="Work Examples & Inspiration"
        text="A gallery of the kinds of construction, renovation, interior and engineering work we undertake."
        image={<Img image="exterior1" priority />}
      />

      <Section>
        {hasIllustrative && (
          <p role="note" className="mb-8 border-l-4 border-orange bg-mist p-4 text-sm text-charcoal/85">
            <strong className="text-navy">Please note:</strong> photographs marked &ldquo;Illustrative example&rdquo; are
            licensed stock images that show the type of work we offer. They are not Meric Engineering Solutions Limited
            projects. Genuine project photographs will be added as they are published.
          </p>
        )}

        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {['All', ...PROJECT_CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => { setCat(c); setOpenIdx(null) }}
              className={`min-h-11 border px-5 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                cat === c ? 'border-navy bg-navy text-white' : 'border-navy/25 text-navy hover:border-navy'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">{list.length} items shown</p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <li key={p.slug} className="flex flex-col bg-white ring-1 ring-navy/10">
              <button
                type="button"
                onClick={() => setOpenIdx(i)}
                aria-label={`Enlarge image: ${p.title}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-navy"
              >
                <span className="absolute inset-0 block transition-transform duration-700 group-hover:scale-105">
                  {p.photo ? <Img src={p.photo.src} alt={p.photo.alt} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" /> : <Img image={p.image} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" />}
                </span>
                {!p.verified && <IllustrativeTag className="absolute left-3 top-3" />}
              </button>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">{p.category}</p>
                <h2 className="mt-1 text-2xl text-navy">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/80">{p.description}</p>
                <Link to={`/projects/${p.slug}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold uppercase tracking-wider text-navy hover:text-orange-600">
                  View details →
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-14 text-center"><Button to={QUOTE_LINK}>Discuss Your Project</Button></div>
      </Section>

      <Lightbox project={openIdx === null ? null : (list[openIdx] ?? null)} onClose={() => setOpenIdx(null)} onStep={step} />
    </>
  )
}
