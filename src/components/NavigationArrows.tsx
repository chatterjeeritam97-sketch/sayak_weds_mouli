type NavigationArrowsProps = {
  canGoBack: boolean
  canGoForward: boolean
  onPrevious: () => void
  onNext: () => void
}

export function NavigationArrows({
  canGoBack,
  canGoForward,
  onPrevious,
  onNext,
}: NavigationArrowsProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-full flex-col items-center justify-between py-3">
      <button
        type="button"
        className="nav-arrow nav-arrow-up pointer-events-auto"
        aria-label="Previous screen"
        disabled={!canGoBack}
        onClick={onPrevious}
      >
        <span className="nav-arrow-glyph" />
      </button>
      <button
        type="button"
        className="nav-arrow nav-arrow-down pointer-events-auto"
        aria-label="Next screen"
        disabled={!canGoForward}
        onClick={onNext}
      >
        <span className="nav-arrow-glyph" />
      </button>
    </div>
  )
}
