import border from '../assets/decorations/alpana/indian_style_border_1_clear.png'
import chant from '../assets/decorations/wedding-motifs/PrajapatiMantra-spaced.png'
import mangalik from '../assets/textures/mangalik.png'
import vinayak from '../assets/textures/vinayak.png'
import { useEffect, useRef } from 'react'
import { attachVine } from './vinePlayback.ts'

export function WelcomeScreen({ playId }: { playId: number }) {
  const vineRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = vineRef.current
    if (!canvas) return
    return attachVine(canvas)
  }, [playId])

  return (
    <section
      data-screen="welcome"
      className="invitation-screen invitation-screen-welcome flex min-h-[74dvh] flex-col items-center justify-center gap-6 px-6 py-16 text-center"
    >
      <img className="welcome-mobile-texture" src={vinayak} alt="" aria-hidden="true" />
      <h1 className="m-0">
        <img className="welcome-chant" src={chant} alt="Bengali chant" />
      </h1>
      <div className="welcome-vine-frame">
        <img className="welcome-frame-edge" src={border} alt="" />
        <div className="welcome-frame-middle">
          <div className="welcome-frame-side">
            <img src={border} alt="" />
          </div>
          <canvas
            ref={vineRef}
            className="welcome-vine"
            width={500}
            height={500}
            role="img"
            aria-label="Gachkouto vine"
          />
          <div className="welcome-frame-side welcome-frame-side-right">
            <img src={border} alt="" />
          </div>
        </div>
        <img className="welcome-frame-edge welcome-frame-bottom" src={border} alt="" />
      </div>
      <img className="welcome-mobile-texture" src={mangalik} alt="" aria-hidden="true" />
    </section>
  )
}
