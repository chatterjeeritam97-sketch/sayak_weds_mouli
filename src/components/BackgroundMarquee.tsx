import { useEffect, useMemo, useRef, useState } from 'react'
import { useMarqueeAnimation } from '../hooks/useMarqueeAnimation.ts'
import {
  columnCountFor,
  marqueeImages,
  splitMarqueeColumns,
} from './marqueeAssets.ts'

const stampBlockHeight = 40

function fillColumn(sources: string[], viewportHeight: number) {
  if (sources.length === 0) return []

  const minimum = Math.ceil(viewportHeight / stampBlockHeight) + 1
  const filled: string[] = []

  while (filled.length < minimum) filled.push(...sources)

  return filled
}

export function BackgroundMarquee() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))
  const columnCount = columnCountFor(viewport.width)
  const columns = useMemo(
    () =>
      splitMarqueeColumns(marqueeImages, columnCount).map((sources) =>
        fillColumn(sources, viewport.height),
      ),
    [columnCount, viewport.height],
  )

  useEffect(() => {
    const update = () => {
      const next = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      setViewport((current) =>
        current.width === next.width && current.height === next.height
          ? current
          : next,
      )
    }

    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useMarqueeAnimation(rootRef, columnCount + viewport.height)

  return (
    <div
      ref={rootRef}
      className="marquee pointer-events-none absolute inset-0"
      data-marquee
      aria-hidden="true"
    >
      {columns.map((sources, index) => (
        <div className="marquee-column" key={index}>
          <div
            className="marquee-track"
            data-marquee-track
            data-direction={index % 2 === 0 ? 'down' : 'up'}
          >
            {[0, 1].map((copy) => (
              <div className="marquee-set" key={copy}>
                {sources.map((src, imageIndex) => (
                  <figure className="marquee-mount" key={`${copy}-${imageIndex}`}>
                    <img src={src} alt="" draggable={false} />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="marquee-grain" />
    </div>
  )
}
