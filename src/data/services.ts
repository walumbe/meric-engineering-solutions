import type { ImageKey } from './images'

export type Service = {
  slug: string
  title: string
  group: string
  image: ImageKey
  summary: string
  description: string
  covers: string[]
}

export const SERVICE_GROUPS = [
  'Construction & Structure',
  'Building Services',
  'Interiors & Finishes',
  'Exteriors & Maintenance',
] as const

export const SERVICES: Service[] = [
  {
    slug: 'general-construction',
    title: 'General Construction',
    group: 'Construction & Structure',
    image: 'construction',
    summary: 'Residential and commercial building, from foundations to structural works.',
    description:
      'New buildings, extensions and improvements for residential and commercial clients, coordinated under one contractor.',
    covers: [
      'Residential and commercial construction',
      'New building construction',
      'Structural works and masonry',
      'Foundations and concrete works',
      'Building extensions and improvements',
    ],
  },
  {
    slug: 'renovation-and-remodeling',
    title: 'Renovation and Remodeling',
    group: 'Construction & Structure',
    image: 'renovation',
    summary: 'Upgrades and alterations for homes and commercial spaces.',
    description:
      'Reworking existing spaces to suit how they are used today, from a single kitchen to a whole floor.',
    covers: [
      'Residential renovations',
      'Commercial space renovations',
      'Kitchen and bathroom remodeling',
      'Building alterations and upgrades',
    ],
  },
  {
    slug: 'plumbing-and-sanitary',
    title: 'Plumbing and Sanitary Installations',
    group: 'Building Services',
    image: 'plumbing',
    summary: 'Water supply, drainage and sanitary fittings, installed and repaired.',
    description:
      'Plumbing for new builds and existing properties, including fittings, drainage and routine repairs.',
    covers: [
      'Water supply installations',
      'Drainage systems',
      'Bathroom and kitchen plumbing',
      'Sanitary fittings',
      'Plumbing repairs and maintenance',
    ],
  },
  {
    slug: 'electrical-installation',
    title: 'Electrical Installation and Maintenance',
    group: 'Building Services',
    image: 'electrical',
    summary: 'Wiring, lighting and electrical maintenance for buildings.',
    description:
      'Electrical installation and troubleshooting. Installations are subject to applicable licensing and safety requirements.',
    covers: [
      'Electrical wiring',
      'Lighting installation',
      'Socket and switch installations',
      'Electrical maintenance and troubleshooting',
      'Installations subject to applicable licensing and safety requirements',
    ],
  },
  {
    slug: 'interior-design-and-finishing',
    title: 'Interior Design and Finishing',
    group: 'Interiors & Finishes',
    image: 'interior',
    summary: 'Space planning and modern finishes for living and working areas.',
    description:
      'Planning and finishing interior spaces so they look good and work well day to day.',
    covers: [
      'Interior space planning',
      'Modern interior finishes',
      'Ceiling installations',
      'Decorative finishes',
      'Kitchen and living space improvements',
    ],
  },
  {
    slug: 'painting-and-decoration',
    title: 'Painting and Decoration',
    group: 'Interiors & Finishes',
    image: 'painting',
    summary: 'Interior and exterior painting with proper surface preparation.',
    description:
      'Preparation, painting and decorative finishing for new work and repainting of existing surfaces.',
    covers: [
      'Interior and exterior painting',
      'Surface preparation',
      'Decorative painting',
      'Finishing and repainting',
    ],
  },
  {
    slug: 'tiling-and-flooring',
    title: 'Tiling and Flooring',
    group: 'Interiors & Finishes',
    image: 'tiling',
    summary: 'Floor and wall tiling for bathrooms, kitchens and living areas.',
    description:
      'Tiling and floor finishing, with attention to surface preparation and neat setting out.',
    covers: [
      'Floor and wall tiling',
      'Bathroom and kitchen tiling',
      'Floor finishing',
      'Surface preparation and repairs',
    ],
  },
  {
    slug: 'ceiling-and-partitioning',
    title: 'Ceiling and Partitioning',
    group: 'Interiors & Finishes',
    image: 'ceiling',
    summary: 'Gypsum and suspended ceilings, office partitions and space division.',
    description:
      'Ceilings and partitions that divide, finish and service interior spaces.',
    covers: [
      'Gypsum ceiling installations',
      'Suspended ceilings',
      'Office partitions',
      'Interior space division',
    ],
  },
  {
    slug: 'aluminium-glass-doors-windows',
    title: 'Aluminium, Glass, Doors and Windows',
    group: 'Interiors & Finishes',
    image: 'glass',
    summary: 'Windows, doors, glass partitions and aluminium fittings.',
    description:
      'Supply-and-fit style installation of openings and glazing, plus replacement and repair of existing units.',
    covers: [
      'Window and door installations',
      'Glass partitions',
      'Aluminium fittings',
      'Replacement and repairs',
    ],
  },
  {
    slug: 'roofing-and-waterproofing',
    title: 'Roofing and Waterproofing',
    group: 'Exteriors & Maintenance',
    image: 'roofing',
    summary: 'Roof installation, repairs, drainage and waterproofing.',
    description:
      'Keeping water out: roofing, roof drainage, waterproofing and leak repairs.',
    covers: [
      'Roof installation and repairs',
      'Roof drainage',
      'Waterproofing',
      'Leak prevention and repairs',
    ],
  },
  {
    slug: 'landscaping-and-external-works',
    title: 'Landscaping and External Works',
    group: 'Exteriors & Maintenance',
    image: 'landscaping',
    summary: 'Paving, walkways, compound drainage and outdoor finishing.',
    description:
      'External works that complete a property, from paving and walkways to drainage and outdoor finishing.',
    covers: [
      'Paving and walkways',
      'Compound improvements',
      'Drainage works',
      'Landscaping and outdoor finishing',
    ],
  },
  {
    slug: 'building-maintenance-and-repairs',
    title: 'Building Maintenance and Repairs',
    group: 'Exteriors & Maintenance',
    image: 'maintenance',
    summary: 'Routine upkeep and repairs across plumbing, electrical and finishes.',
    description:
      'Ongoing care for properties, including routine repairs and correction of defects.',
    covers: [
      'General property maintenance',
      'Routine repairs',
      'Plumbing and electrical maintenance',
      'Defect correction and finishing improvements',
    ],
  },
]
