import border from '../assets/decorations/alpana/indian_style_border_1_clear.png'
import { SindoorDots } from '../components/SindoorDots.tsx'
import mangalik from '../assets/textures/mangalik.png'

export function CelebrationScreen() {
  return (
    <section
      data-screen="celebration"
      className="invitation-screen invitation-screen-welcome reception-screen flex min-h-[74dvh] items-center justify-center px-5 py-8 text-center sm:px-8"
    >
      <div className="reception-content">
        <SindoorDots />
        <p className="reception-hosts">
          Mr. Krishna Kisore Mazumdar and Mrs. Debasri Mazumdar
        </p>
        <p className="reception-request">
          cordially request the pleasure of your gracious presence and blessings
          on the auspicious occasion of the
        </p>
        <img className="reception-divider" src={border} alt="" aria-hidden="true" />
        <h1 className="reception-title">Wedding Reception Ceremony</h1>
        <p className="reception-subtitle">of their only beloved son</p>
        <p className="reception-couple">
          <span>Sayak</span>
          <span className="reception-with">With</span>
          <span>Mouli</span>
        </p>
        <p className="reception-bride-family">
          beloved daughter of Mr. Madhab Roy Choudhury and Mrs. Lakshmi Roy
          Choudhury
        </p>
        <p className="reception-blessing">
          Kindly join us in celebrating this joyous union as they embark upon a
          lifelong journey of love and togetherness.
        </p>
        <img className="reception-divider" src={border} alt="" aria-hidden="true" />
        <p className="reception-date">
          <span>Date: </span>
          <time dateTime="2026-11-27T18:00">Friday, 27th November, 2026</time>
          <br />
          <span className="reception-time">6 PM onwards</span>
        </p>
        <SindoorDots />
        <img className="screen-bottom-mangalik" src={mangalik} alt="" aria-hidden="true" />
      </div>
    </section>
  )
}
