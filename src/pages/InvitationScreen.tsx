import groom from '../assets/images/groom.png'
import {
  AnimatedProfileScreen,
  type ProfileCopy,
} from '../components/AnimatedProfileScreen.tsx'

const groomCopy: ProfileCopy = {
  heading: 'Groom',
  name: 'Sayak Mazumdar',
  father: 'Father: Mr. Krishna Kisore Mazumdar',
  mother: 'Mother: Mrs. Debasri Mazumdar',
  address: '🏠  Dumdum Chiriamore, Kolkata',
}

export function InvitationScreen() {
  return (
    <AnimatedProfileScreen
      screenId="invitation"
      image={groom}
      imageAlt="Sayak Mazumdar"
      imageAspectRatio="3 / 4"
      copy={groomCopy}
      warmBackground
    />
  )
}
