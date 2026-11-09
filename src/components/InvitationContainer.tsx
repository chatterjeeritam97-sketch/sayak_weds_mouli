import type { ReactNode } from 'react'

type InvitationContainerProps = {
  children: ReactNode
}

export function InvitationContainer({ children }: InvitationContainerProps) {
  return (
    <main className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-4 sm:px-6">
      <div className="invitation-panel w-full max-w-5xl">{children}</div>
    </main>
  )
}
