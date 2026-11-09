export function SindoorDots() {
  return (
    <div className="sindoor-dots" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <span className="sindoor-dot" key={index} />
      ))}
    </div>
  )
}