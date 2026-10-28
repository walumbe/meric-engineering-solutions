export const SITE = {
  name: 'Meric Engineering Solutions Limited',
  shortName: 'Meric Engineering',
  director: 'Eric Lizinga',
  phoneDisplay: '+254 723 274623',
  phoneTel: '+254723274623',
  waNumber: '254723274623',
  waMessage:
    'Hello Meric Engineering Solutions Limited, I would like to enquire about your construction and engineering services.',
  // Set VITE_SITE_URL in Vercel once the production domain is known (e.g. https://www.example.co.ke).
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? '',
} as const

export const waLink = (message: string = SITE.waMessage) =>
  `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(message)}`

export const telLink = `tel:${SITE.phoneTel}`

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Our Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact Us' },
] as const

export const QUOTE_LINK = '/contact#enquiry'
