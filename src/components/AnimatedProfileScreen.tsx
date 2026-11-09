import { useEffect, useState } from 'react'

export type ProfileCopy = {
  heading: string
  name: string
  father: string
  mother: string
  address: string
}

type AnimatedProfileScreenProps = {
  screenId: string
  image: string
  imageAlt: string
  imageAspectRatio: string
  copy: ProfileCopy
  warmBackground?: boolean
}

type TypewriterLineProps = {
  text: string
  startIndex: number
  typedCharacters: number
}

function TypewriterLine({
  text,
  startIndex,
  typedCharacters,
}: TypewriterLineProps) {
  const characters = Array.from(text)
  const visibleText = characters
    .slice(0, Math.max(0, typedCharacters - startIndex))
    .join('')

  return (
    <span className="profile-typewriter-line">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="profile-typewriter-reserve">
        {text}
      </span>
      <span aria-hidden="true" className="profile-typewriter-reveal">
        {visibleText}
      </span>
    </span>
  )
}

export function AnimatedProfileScreen({
  screenId,
  image,
  imageAlt,
  imageAspectRatio,
  copy,
  warmBackground = false,
}: AnimatedProfileScreenProps) {
  let characterOffset = 0
  const lines = [
    copy.heading,
    copy.name,
    copy.father,
    copy.mother,
    copy.address,
  ].map((text) => {
    const line = { text, startIndex: characterOffset }
    characterOffset += Array.from(text).length
    return line
  })
  const totalCharacters = characterOffset
  const [imageLoaded, setImageLoaded] = useState(false)
  const [typedCharacters, setTypedCharacters] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? totalCharacters
      : 0,
  )

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let characterCount = 0
    const interval = window.setInterval(() => {
      characterCount += 1
      setTypedCharacters(characterCount)
      if (characterCount >= totalCharacters) window.clearInterval(interval)
    }, 26)

    return () => window.clearInterval(interval)
  }, [totalCharacters])

  const [headingLine, nameLine, fatherLine, motherLine, addressLine] = lines

  return (
    <section
      data-screen={screenId}
      className={`invitation-screen${warmBackground ? ' invitation-screen-welcome' : ''} flex min-h-[74dvh] items-center justify-center px-6 py-16 sm:px-8`}
    >
      <div className="profile-layout">
        <img
          className={`profile-photo${imageLoaded ? ' profile-photo-reveal' : ''}`}
          style={{ aspectRatio: imageAspectRatio }}
          src={image}
          alt={imageAlt}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="profile-card">
          <h1>
            <TypewriterLine {...headingLine} typedCharacters={typedCharacters} />
          </h1>
          <p className="profile-name">
            <TypewriterLine {...nameLine} typedCharacters={typedCharacters} />
          </p>
          <p>
            <TypewriterLine {...fatherLine} typedCharacters={typedCharacters} />
          </p>
          <p>
            <TypewriterLine {...motherLine} typedCharacters={typedCharacters} />
          </p>
          <p>
            <br />
            <TypewriterLine {...addressLine} typedCharacters={typedCharacters} />
          </p>
        </div>
      </div>
    </section>
  )
}
