import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-mystic-600/20 bg-void-light p-4 ${className}`}>{children}</div>
  )
}

export function PremiumLock({ children, unlocked, label = 'Premium' }: { children: ReactNode; unlocked: boolean; label?: string }) {
  if (unlocked) return <>{children}</>
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="pointer-events-none select-none blur-sm">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-void/70">
        <span className="text-2xl">🔒</span>
        <span className="text-xs font-semibold text-gold">{label} only</span>
      </div>
    </div>
  )
}
