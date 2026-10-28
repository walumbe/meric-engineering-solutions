import type { ImageKey } from './images'

export type ProjectCategory = 'Construction' | 'Renovation' | 'Interiors' | 'Engineering'

export const PROJECT_CATEGORIES: ProjectCategory[] = ['Construction', 'Renovation', 'Interiors', 'Engineering']

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  image: ImageKey
  description: string
  /**
   * Keep `verified: false` for stock imagery. Only set `verified: true` for photographs of
   * genuine Meric Engineering Solutions Limited work. Unverified items are always labelled
   * "Illustrative example" on the site.
   */
  verified: boolean
  /** Genuine project photo hosted in /public (overrides `image`). */
  photo?: { src: string; alt: string }
  /** Optional extra detail for a genuine project (location, scope, year...). Add only verified facts. */
  details?: string[]
}

/**
 * HOW TO ADD A REAL PROJECT
 * 1. Put your photo in /public/images/projects/ (e.g. my-project.jpg).
 * 2. Add an entry below with `verified: true` and
 *    `photo: { src: '/images/projects/my-project.jpg', alt: 'What the photo shows' }`.
 *    (`image` is still required by the type; reuse any key, it is ignored when `photo` is set.)
 * Nothing else needs to change: the gallery, filters, lightbox and detail pages read this list.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'residential-building-exteriors',
    title: 'Residential building exteriors',
    category: 'Construction',
    image: 'exterior1',
    description: 'Clean masonry and rendered facades: the kind of exterior finish we can deliver for new homes.',
    verified: false,
  },
  {
    slug: 'commercial-glazed-facades',
    title: 'Commercial and glazed facades',
    category: 'Construction',
    image: 'exterior2',
    description: 'Commercial buildings with glazing and aluminium framing.',
    verified: false,
  },
  {
    slug: 'structural-frames-and-concrete',
    title: 'Structural frames and concrete works',
    category: 'Construction',
    image: 'construction',
    description: 'Reinforcement, formwork and concrete works for foundations and frames.',
    verified: false,
  },
  {
    slug: 'roofing-installation',
    title: 'Roofing installation',
    category: 'Construction',
    image: 'roofTiles',
    description: 'Roof tiling and sheeting with attention to drainage and waterproofing.',
    verified: false,
  },
  {
    slug: 'kitchen-remodeling',
    title: 'Kitchen remodeling',
    category: 'Renovation',
    image: 'renovation',
    description: 'Reworking a kitchen layout with new cabinetry, finishes and fittings.',
    verified: false,
  },
  {
    slug: 'tiling-and-wall-finishes',
    title: 'Tiling and wall finishes',
    category: 'Renovation',
    image: 'mosaic',
    description: 'Wall and floor tiling for bathrooms, kitchens and feature areas.',
    verified: false,
  },
  {
    slug: 'painting-and-redecoration',
    title: 'Painting and redecoration',
    category: 'Renovation',
    image: 'painting',
    description: 'Surface preparation and repainting to refresh existing rooms.',
    verified: false,
  },
  {
    slug: 'modern-living-interiors',
    title: 'Modern living interiors',
    category: 'Interiors',
    image: 'interior',
    description: 'Finished living spaces that show the standard of interior finishing we aim for.',
    verified: false,
  },
  {
    slug: 'bedroom-and-lounge-finishes',
    title: 'Bedroom and lounge finishes',
    category: 'Interiors',
    image: 'bedroom',
    description: 'Ceilings, paintwork and fittings that complete a comfortable room.',
    verified: false,
  },
  {
    slug: 'ceilings-and-partitions',
    title: 'Ceilings and partitions',
    category: 'Interiors',
    image: 'ceiling',
    description: 'Suspended ceilings and partitions for offices and commercial interiors.',
    verified: false,
  },
  {
    slug: 'plumbing-installations',
    title: 'Plumbing installations',
    category: 'Engineering',
    image: 'pipesWall',
    description: 'Concealed water supply and drainage pipework installed during construction.',
    verified: false,
  },
  {
    slug: 'electrical-installations',
    title: 'Electrical installations',
    category: 'Engineering',
    image: 'panel',
    description: 'Distribution boards, wiring and testing for safe electrical systems.',
    verified: false,
  },
]
