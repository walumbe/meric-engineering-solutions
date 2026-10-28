import { useLocation } from 'react-router-dom'
import { SITE } from '../data/site'

/** React 19 hoists <title>/<meta>/<link> rendered anywhere into <head>. */
export default function Seo({ title, description }: { title: string; description: string }) {
  const { pathname } = useLocation()
  const full = pathname === '/' ? title : `${title} | ${SITE.name}`
  const canonical = SITE.url ? `${SITE.url}${pathname === '/' ? '' : pathname}` : undefined
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <meta property="og:url" content={canonical} />}
    </>
  )
}
