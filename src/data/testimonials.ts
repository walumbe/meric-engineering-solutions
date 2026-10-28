export type Testimonial = {
  quote: string
  name: string
  detail?: string // e.g. project type. Only add genuine feedback with the client's permission.
}

/**
 * Leave empty until genuine, permitted client feedback is available.
 * While empty, the home page shows the "Our approach to service" section instead.
 */
export const TESTIMONIALS: Testimonial[] = []
