import type { ReactNode } from 'react'

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-xl bg-void px-4 py-10 text-mystic-50">
      {children}
    </div>
  )
}
