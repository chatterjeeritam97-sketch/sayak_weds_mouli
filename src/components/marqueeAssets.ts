const imageModules = import.meta.glob(
  '../assets/decorations/verticalmarq/*.svg',
  { eager: true, import: 'default', query: '?url' },
)

export const marqueeImages = Object.entries(imageModules)
  .sort(([left], [right]) =>
    left.localeCompare(right, undefined, { numeric: true }),
  )
  .map(([, src]) => src)

const stampColumnWidth = 76

export function columnCountFor(width: number) {
  const fitted = Math.floor(width / stampColumnWidth)
  return Math.max(2, Math.min(marqueeImages.length, fitted))
}

export function splitMarqueeColumns(images: string[], columnCount: number) {
  const columns = Array.from({ length: columnCount }, () => [] as string[])

  images.forEach((src, index) => {
    columns[index % columnCount].push(src)
  })

  return columns
}
