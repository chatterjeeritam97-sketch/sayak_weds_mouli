import { useCallback, useState } from 'react'
import { BackgroundMarquee } from './components/BackgroundMarquee.tsx'
import { InvitationContainer } from './components/InvitationContainer.tsx'
import { MusicPlayer } from './components/MusicPlayer.tsx'
import { NavigationArrows } from './components/NavigationArrows.tsx'
import {
  PageTransition,
  type PageTurn,
} from './components/PageTransition.tsx'
import { BrideScreen } from './pages/BrideScreen.tsx'
import { CelebrationScreen } from './pages/CelebrationScreen.tsx'
import { ClosingScreen } from './pages/ClosingScreen.tsx'
import { InvitationScreen } from './pages/InvitationScreen.tsx'
import { WelcomeScreen } from './pages/WelcomeScreen.tsx'
import { useBackgroundMusic } from './hooks/useBackgroundMusic.ts'

const laterScreens = [
  InvitationScreen,
  BrideScreen,
  CelebrationScreen,
  ClosingScreen,
]

const screenCount = laterScreens.length + 1

export default function App() {
  const [index, setIndex] = useState(0)
  const [turn, setTurn] = useState<PageTurn | null>(null)
  const [welcomePlay, setWelcomePlay] = useState(0)
  const { isPlaying, toggle: toggleMusic } = useBackgroundMusic()

  const settle = useCallback((nextIndex: number) => {
    setIndex(nextIndex)
    setTurn(null)
  }, [])

  const requestTurn = (direction: 1 | -1) => {
    if (turn) return

    const nextIndex = index + direction
    if (nextIndex < 0 || nextIndex >= screenCount) return

    if (nextIndex === 0) setWelcomePlay((play) => play + 1)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIndex(nextIndex)
      return
    }

    setTurn({ to: nextIndex, direction })
  }

  const renderScreen = (screenIndex: number) => {
    if (screenIndex === 0) return <WelcomeScreen playId={welcomePlay} />
    const Screen = laterScreens[screenIndex - 1]
    return <Screen />
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden text-ink">
      <BackgroundMarquee />
      <InvitationContainer>
        <NavigationArrows
          canGoBack={index > 0 && turn === null}
          canGoForward={index < screenCount - 1 && turn === null}
          onPrevious={() => requestTurn(-1)}
          onNext={() => requestTurn(1)}
        />
        <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
        <PageTransition
          activeIndex={index}
          turn={turn}
          renderScreen={renderScreen}
          onSettled={settle}
        />
      </InvitationContainer>
    </div>
  )
}
