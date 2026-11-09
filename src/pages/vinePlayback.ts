import vineUrl from '../assets/animations/gachkouto-vine-v3.gif'

export function attachVine(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  if (!context) return

  let stopped = false
  let decoder: ImageDecoder | undefined

  const play = async () => {
    try {
      const response = await fetch(vineUrl)
      if (!response.ok) throw new Error(`GIF request failed: ${response.status}`)

      const data = await response.arrayBuffer()
      if (stopped) return

      decoder = new ImageDecoder({ data, type: 'image/gif' })
      await decoder.tracks.ready

      const frameCount = decoder.tracks.selectedTrack?.frameCount ?? 0
      if (frameCount === 0) return

      const speedUpPerFrame = 500 / frameCount
      let frameIndex = 0

      while (!stopped) {
        const { image } = await decoder.decode({ frameIndex })
        const frameDuration = Math.max(
          (image.duration ?? 100_000) / 1000 - speedUpPerFrame,
          16,
        )

        try {
          if (stopped) break
          context.clearRect(0, 0, canvas.width, canvas.height)
          context.drawImage(image, 0, 0, canvas.width, canvas.height)
        } finally {
          image.close()
        }

        frameIndex = (frameIndex + 1) % frameCount
        await new Promise((resolve) => window.setTimeout(resolve, frameDuration))
      }
    } catch (error) {
      if (!stopped) console.error('Unable to play the welcome GIF', error)
    }
  }

  void play()

  return () => {
    stopped = true
    decoder?.close()
  }
}