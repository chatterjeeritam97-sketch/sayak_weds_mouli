import bride from '../assets/images/bride.png'
import {
  AnimatedProfileScreen,
  type ProfileCopy,
} from '../components/AnimatedProfileScreen.tsx'

const brideCopy: ProfileCopy = {
  heading: 'Bride',
  name: 'Mouli Roy Choudhury',
  father: 'Father: Mr. Madhab Roy Choudhury',
  mother: 'Mother: Mrs. Lakshmi Roy Choudhury',
  address: '🏠 Dakshin Chatra, Doctorkhana',
}

export function BrideScreen() {
  return (
    <AnimatedProfileScreen
      screenId="bride"
      image={bride}
      imageAlt="Mouli Roy Choudhury"
      imageAspectRatio="1173 / 1341"
      copy={brideCopy}
      warmBackground
    />
  )
}