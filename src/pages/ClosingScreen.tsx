import border from '../assets/decorations/alpana/indian_style_border_1_clear.png'
import { SindoorDots } from '../components/SindoorDots.tsx'
import mangalik from '../assets/textures/mangalik.png'

const venueUrl =
  'https://www.google.com/maps/place/Ivory+Royal+Banquet/@22.6305216,88.376594,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89d7db7cb368d:0xd54ee359a78bce1e!8m2!3d22.6305216!4d88.3791689!16s%2Fg%2F11mt17vqsr?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D'

const contacts = [
  { name: 'Mr. Krishna Kisore Mazumdar', phone: '9433053003' },
  { name: 'Mrs. Debasri Mazumdar', phone: '9433096264' },
  { name: 'Mr. Sayak Mazumdar', phone: '9836793994' },
]

export function ClosingScreen() {
  return (
    <section
      data-screen="closing"
      className="invitation-screen invitation-screen-welcome reception-screen flex min-h-[74dvh] items-center justify-center px-5 py-8 text-center sm:px-8"
    >
      <div className="closing-content">
        <SindoorDots />
        <p className="closing-label">Venue</p>
        <a
          className="venue-link pulse-link"
          href={venueUrl}
          target="_blank"
          rel="noreferrer"
        >
          Ivory Royal Banquet
        </a>
        <p className="venue-address">
          48F B.T. Road, Sinthi More, Kolkata- 700050
        </p>
        <img className="reception-divider" src={border} alt="" aria-hidden="true" />
        <p className="closing-label">Contact No.</p>
        <div className="contact-list">
          {contacts.map(({ name, phone }) => (
            <p className="contact-line" key={phone}>
              <span>{name}</span>
              <a className="phone-link pulse-link" href={`tel:${phone}`}>
                {phone}
              </a>
            </p>
          ))}
        </div>
        <SindoorDots />
        <img className="screen-bottom-mangalik" src={mangalik} alt="" aria-hidden="true" />
      </div>
    </section>
  )
}
