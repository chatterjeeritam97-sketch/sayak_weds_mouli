import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'

export type PageTurn = {
  to: number
  direction: 1 | -1
}

type PageTransitionProps = {
  activeIndex: number
  turn: PageTurn | null
  renderScreen: (index: number) => ReactNode
  onSettled: (index: number) => void
}

export function PageTransition({
  activeIndex,
  turn,
  renderScreen,
  onSettled,
}: PageTransitionProps) {
  const sheetRefs = useRef(new Map<number, HTMLDivElement>())

  useEffect(() => {
    if (!turn) return

    const current = sheetRefs.current.get(activeIndex)
    const incoming = sheetRefs.current.get(turn.to)
    if (!current || !incoming) return

    const forward = turn.direction === 1
    const destination = turn.to
    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(incoming, { clearProps: 'transform,zIndex' })
        onSettled(destination)
      },
    })
    timeline
      .set(current, { yPercent: 0, zIndex: 1 })
      .set(incoming, { yPercent: forward ? 100 : -100, zIndex: 2 })
      .to(current, {
        yPercent: forward ? -100 : 100,
        duration: 0.5,
        ease: 'power2.inOut',
        overwrite: 'auto',
      }, 0)
      .to(incoming, {
        yPercent: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        overwrite: 'auto',
      }, 0)

    return () => {
      timeline.kill()
    }
  }, [activeIndex, onSettled, turn])

  return (
    <div className="page-stage">
      {(turn
        ? [
            { screenIndex: turn.to, incoming: true },
            { screenIndex: activeIndex, incoming: false },
          ]
        : [{ screenIndex: activeIndex, incoming: false }]
      ).map(({ screenIndex, incoming }) => (
        <div
          key={screenIndex}
          ref={(node) => {
            if (node) sheetRefs.current.set(screenIndex, node)
            else sheetRefs.current.delete(screenIndex)
          }}
          className={`page-sheet${incoming ? ' page-sheet-incoming' : ''}`}
        >
          {renderScreen(screenIndex)}
        </div>
      ))}
    </div>
  )
}
