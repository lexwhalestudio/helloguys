import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PublicShell } from '../components/PublicShell'
import { useStore } from '../lib/store'

type Mode = 'register' | 'login'

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#fff" />
      <text x="9" y="12.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#4285F4" fontFamily="Arial, sans-serif">
        G
      </text>
    </svg>
  )
}

export function Auth() {
  const { register, login } = useStore()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('register')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [googleNote, setGoogleNote] = useState(false)

  const canSubmit = Boolean(identifier.trim() && password.trim())

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!canSubmit) return

    if (mode === 'register') {
      register(identifier.trim())
      navigate('/onboarding')
      return
    }

    const ok = login(identifier.trim())
    if (ok) {
      navigate('/')
    } else {
      setError("No account found on this device with that email. Try Register, or check your spelling.")
    }
  }

  return (
    <PublicShell>
      <div className="flex flex-col items-center gap-6 pt-10 text-center">
        <span className="text-5xl">✦</span>
        <div>
          <h1 className="font-display text-2xl text-gold">Mystic Companion</h1>
          <p className="mt-2 text-sm text-mystic-200/70">
            {mode === 'register' ? 'Create your account to begin.' : 'Welcome back.'}
          </p>
        </div>

        <div className="flex w-full rounded-xl border border-mystic-600/30 p-1">
          <button
            type="button"
            onClick={() => {
              setMode('register')
              setError(null)
            }}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold ${mode === 'register' ? 'bg-mystic-600 text-white' : 'text-mystic-200/60'}`}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login')
              setError(null)
            }}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold ${mode === 'login' ? 'bg-mystic-600 text-white' : 'text-mystic-200/60'}`}
          >
            Log In
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 text-left">
          <label className="flex flex-col gap-1 text-sm text-mystic-200/80">
            Email or username
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com"
              className="rounded-xl border border-mystic-600/30 bg-void px-3 py-2 text-mystic-50 outline-none focus:border-gold"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-mystic-200/80">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-xl border border-mystic-600/30 bg-void px-3 py-2 text-mystic-50 outline-none focus:border-gold"
            />
          </label>

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-xl bg-mystic-600 py-3 font-semibold text-white disabled:opacity-40"
          >
            {mode === 'register' ? 'Create account' : 'Log in'}
          </button>
        </form>

        <div className="flex w-full items-center gap-3 text-xs text-mystic-200/40">
          <div className="h-px flex-1 bg-mystic-600/30" />
          or
          <div className="h-px flex-1 bg-mystic-600/30" />
        </div>

        <button
          type="button"
          onClick={() => setGoogleNote(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-mystic-600/30 bg-void-light py-3 text-sm font-semibold text-mystic-50"
        >
          <GoogleMark />
          Continue with Google
        </button>

        {googleNote && (
          <p className="text-center text-xs text-mystic-200/50">
            Google Sign-In isn't connected in this test build yet — it needs a real backend first.
            Use email/username above for now.
          </p>
        )}

        <p className="text-center text-[11px] text-mystic-200/40">
          By continuing you agree this is a pre-launch test build. See our{' '}
          <Link to="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </PublicShell>
  )
}
