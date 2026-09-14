import { NavLink, Outlet } from 'react-router-dom'
import { useStore } from '../lib/store'

const NAV_ITEMS = [
  { to: '/', label: 'Companion', icon: '🌟' },
  { to: '/moon', label: 'Moon', icon: '🌙' },
  { to: '/tarot', label: 'Tarot', icon: '🃏' },
  { to: '/minerals', label: 'Minerals', icon: '💎' },
  { to: '/compatibility', label: 'Match', icon: '💫' },
  { to: '/profile', label: 'Dossier', icon: '📜' },
]

export function Layout() {
  const { isPremium } = useStore()

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col bg-void">
      <header className="flex items-center justify-between border-b border-mystic-600/20 px-4 py-3">
        <span className="font-display text-lg text-gold">✦ Mystic Companion</span>
        {isPremium ? (
          <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">Premium</span>
        ) : (
          <NavLink to="/upgrade" className="rounded-full bg-mystic-600 px-3 py-1 text-xs font-semibold text-white">
            Upgrade
          </NavLink>
        )}
      </header>

      <main className="flex-1 px-4 py-4">
        <Outlet />
      </main>

      <nav className="grid grid-cols-6 gap-1 border-t border-mystic-600/20 bg-void-light px-1 py-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] ${
                isActive ? 'text-gold' : 'text-mystic-200/60'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
