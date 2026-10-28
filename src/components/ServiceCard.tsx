import { Link } from 'react-router-dom'
import type { Service } from '../data/services'
import Img from './Img'

export default function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="group flex h-full flex-col bg-white shadow-[0_1px_0_rgba(20,40,63,0.12)] ring-1 ring-navy/10 transition-shadow duration-300 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <Img image={s.image} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl text-navy">{s.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/80">{s.summary}</p>
        <Link
          to={`/services#${s.slug}`}
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy hover:text-orange-600"
          aria-label={`Learn more about ${s.title}`}
        >
          Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  )
}
