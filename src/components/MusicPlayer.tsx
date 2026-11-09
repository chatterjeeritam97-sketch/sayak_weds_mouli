type MusicPlayerProps = {
  isPlaying: boolean
  onToggle: () => void
}

export function MusicPlayer({ isPlaying, onToggle }: MusicPlayerProps) {
  return (
    <button
      type="button"
      data-music-toggle
      className="music-player"
      aria-pressed={isPlaying}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      title={isPlaying ? 'Pause music' : 'Play music'}
      onClick={onToggle}
    >
      <span aria-hidden="true">{isPlaying ? '♫' : '♪'}</span>
    </button>
  )
}
