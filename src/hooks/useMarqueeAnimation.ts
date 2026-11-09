import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'

const pixelsPerSecond = [34, 42, 37, 46, 32]

export function useMarqueeAnimation(
  rootRef: RefObject<HTMLElement | null>,
  layoutKey: number,
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) return

    let cancelled = false
    const context = gsap.context(() => {}, root)

    const start = async () => {
      const images = [...root.querySelectorAll('img')]
      await Promise.all(
        images.map(async (image) => {
          try {
            await image.decode()
          } catch {
            if (image.complete) return
            await new Promise<void>((resolve) => {
              image.addEventListener('load', () => resolve(), { once: true })
              image.addEventListener('error', () => resolve(), { once: true })
            })
          }
        }),
      )

      if (cancelled) return

      const tracks = [
        ...root.querySelectorAll<HTMLElement>('[data-marquee-track]'),
      ]

      tracks.forEach((track, index) => {
        const set = track.querySelector<HTMLElement>(':scope > .marquee-set')
        const distance = set?.getBoundingClientRect().height ?? 0
        if (distance === 0) return

        const downward = track.dataset.direction === 'down'
        const speed = pixelsPerSecond[index % pixelsPerSecond.length]

        context.add(() => {
          gsap.fromTo(
            track,
            { yPercent: downward ? -50 : 0 },
            {
              yPercent: downward ? 0 : -50,
              duration: distance / speed,
              ease: 'none',
              repeat: -1,
            },
          )
        })
      })
    }

    void start()

    return () => {
      cancelled = true
      context.revert()
    }
  }, [layoutKey, rootRef])
}
