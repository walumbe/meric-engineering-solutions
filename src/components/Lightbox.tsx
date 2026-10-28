import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'
import Img from './Img'
import { IllustrativeTag } from './ui'

/** Accessible image preview using the native <dialog> (focus trap, Esc to close, focus restore). */
export default function Lightbox({
  project,
  onClose,
  onStep,
}: {
  project: Project | null
  onClose: () => void
  onStep: (dir: -1 | 1) => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (project && !d.open) {
      d.showModal()
      document.body.style.overflow = 'hidden'
    }
    if (!project && d.open) d.close()
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onStep(-1)
      if (e.key === 'ArrowRight') onStep(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onStep])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={project ? `${project.title} image preview` : 'Image preview'}
      className="m-auto max-h-[100dvh] w-full max-w-6xl bg-transparent p-0 backdrop:bg-navy-900/90"
    >
      {project && (
        <figure className="relative">
          <div className="relative aspect-[3/2] max-h-[78dvh] w-full bg-navy-900">
            {project.photo ? <Img src={project.photo.src} alt={project.photo.alt} sizes="100vw" className="!object-contain" /> : <Img image={project.image} sizes="100vw" className="!object-contain" />}
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">{project.category}</p>
              <p className="font-display text-2xl uppercase text-navy">{project.title}</p>
            </div>
            {!project.verified && <IllustrativeTag className="!bg-mist" />}
          </figcaption>
          <div className="absolute inset-x-0 top-0 flex justify-between p-2 sm:p-3">
            <div className="flex gap-2">
              <button type="button" onClick={() => onStep(-1)} aria-label="Previous image" className="h-11 w-11 bg-white/95 text-xl text-navy hover:bg-orange">←</button>
              <button type="button" onClick={() => onStep(1)} aria-label="Next image" className="h-11 w-11 bg-white/95 text-xl text-navy hover:bg-orange">→</button>
            </div>
            <button type="button" onClick={onClose} aria-label="Close preview" className="h-11 w-11 bg-white/95 text-xl text-navy hover:bg-orange">✕</button>
          </div>
        </figure>
      )}
    </dialog>
  )
}
