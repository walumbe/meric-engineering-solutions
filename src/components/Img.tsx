import { useState } from 'react'
import {
  IMAGES,
  IMAGE_WIDTHS,
  SELF_HOSTED,
  localUrl,
  remoteUrl,
  type ImageKey,
} from '../data/images'

type Props = {
  image?: ImageKey
  /** Direct source for genuine project photos hosted in /public. */
  src?: string
  alt?: string
  sizes?: string
  priority?: boolean
  className?: string
}

/**
 * Responsive photo that fills its parent (parent must be `relative` with a fixed aspect ratio
 * or height, which prevents layout shift). If an image fails to load it falls back to a plain
 * navy panel rather than a broken-image icon.
 */
export default function Img({ image, src, alt, sizes = '100vw', priority = false, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  const text = alt ?? (image ? IMAGES[image].alt : '')

  if (failed || (!image && !src)) {
    return <div role="img" aria-label={text} className={`absolute inset-0 bg-navy ${className}`} />
  }

  let url: string
  let srcSet: string | undefined
  if (src) {
    url = src
  } else if (SELF_HOSTED && image) {
    url = localUrl(image)
  } else {
    url = remoteUrl(image!, 1200)
    srcSet = IMAGE_WIDTHS.map((w) => `${remoteUrl(image!, w)} ${w}w`).join(', ')
  }

  return (
    <img
      src={url}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={text}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  )
}
