/**
 * Photography manifest.
 *
 * Every photo is a licensed Unsplash photograph (Unsplash License: free for commercial use,
 * no attribution required). IDs were taken from Unsplash listing pages. These are STOCK
 * photographs that illustrate services; they are NOT Meric Engineering Solutions Limited projects.
 *
 * To self-host (recommended before launch): run `npm run images:download`, then set
 * VITE_SELF_HOSTED_IMAGES=true. To check that every URL resolves: `npm run images:check`.
 */
export type ImageKey = keyof typeof IMAGES

export const IMAGES = {
  hero: { id: '1508450859948-4e04fabaa4ea', alt: 'Concrete building under construction against the sky' },
  intro: { id: '1587582423116-ec07293f0395', alt: 'Construction worker in a hard hat on a building frame' },
  about1: { id: '1772442198624-4fc4d7281e89', alt: 'Man reviewing blueprints at a construction site' },
  about2: { id: '1626885930974-4b69aa21bbf9', alt: 'Two construction workers in safety vests on site' },
  cta: { id: '1535732759880-bbd5c7265e3f', alt: 'Tower crane seen from below at a construction site' },
  construction: { id: '1768677903496-becc4be07258', alt: 'Construction worker inspecting rebar on a building site' },
  plumbing: { id: '1749532125405-70950966b0e5', alt: 'Plumber repairing plumbing in a bathroom' },
  electrical: { id: '1621905251189-08b45d6a269e', alt: 'Electrician installing wiring wearing a yellow hard hat' },
  interior: { id: '1598928506311-c55ded91a20c', alt: 'Living room with a marble fireplace, white sofas and dark wood shelving' },
  painting: { id: '1688372199140-cade7ae820fe', alt: 'Man painting a wall with yellow paint' },
  roofing: { id: '1763665814538-8ba04597286c', alt: 'Workers installing roof tiles on a new building' },
  tiling: { id: '1523413307857-ef24c53571ae', alt: 'Person holding a white tile' },
  renovation: { id: '1778731525401-982ab0eaa746', alt: 'Stylish kitchen with island, pendant lights and bar stools' },
  glass: { id: '1522968941782-e27ac665baa3', alt: 'Glass wall hallway in a modern building' },
  ceiling: { id: '1785682118449-21da8825754d', alt: 'Construction worker on a lift installing ceiling components' },
  landscaping: { id: '1574757987642-5755f0839101', alt: 'Man pouring cement for external works' },
  maintenance: { id: '1768321918210-a775e4c88f08', alt: 'Plumbing and electrical work inside a wall under construction' },
  exterior1: { id: '1479839672679-a46483c0e7c8', alt: 'White modern cement building under a blue sky' },
  exterior2: { id: '1523274158540-2aa98c15ec26', alt: 'White building structure with blue glass windows' },
  bedroom: { id: '1770941633927-b7a15557e0e1', alt: 'Spacious bedroom with a large bed and seating area' },
  lounge: { id: '1564078516393-cf04bd966897', alt: 'Grey chaise couch beside a window' },
  pipesWall: { id: '1768321913920-d3ac011e0683', alt: 'Exposed plumbing pipes and electrical conduit in a wall' },
  panel: { id: '1758101755915-462eddc23f57', alt: 'Electrician testing an electrical panel with a multimeter' },
  mosaic: { id: '1758832505443-26bfecea4669', alt: 'Mosaic tile wall with a recessed square niche' },
  roofTiles: { id: '1763665814965-b5c4b3547908', alt: 'Construction workers installing roof tiles on a new building' },
} as const

export const SELF_HOSTED = import.meta.env.VITE_SELF_HOSTED_IMAGES === 'true'

export const IMAGE_WIDTHS = [480, 800, 1200, 1600, 2200] as const

export const remoteUrl = (key: ImageKey, w: number, q = 70) =>
  `https://images.unsplash.com/photo-${IMAGES[key].id}?auto=format&fit=crop&q=${q}&w=${w}`

export const localUrl = (key: ImageKey) => `/images/${key}.jpg`
