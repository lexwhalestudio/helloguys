import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSignForDate } from '../lib/zodiac'
import { useStore } from '../lib/store'

export function Onboarding() {
  const { completeOnboarding } = useStore()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')

  const previewSign = birthDate ? getSignForDate(new Date(birthDate)) : null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !birthDate) return
    completeOnboarding(name.trim(), birthDate)
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center gap-6 pt-10 text-center">
      <span className="text-5xl">🔮</span>
      <div>
        <h1 className="font-display text-2xl text-gold">Welcome, wanderer.</h1>
        <p className="mt-2 text-sm text-mystic-200/70">
          Tell me who you are and when the stars first noticed you. I promise this is the only boring part.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 text-left">
        <label className="flex flex-col gap-1 text-sm text-mystic-200/80">
          What should I call you?
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="rounded-xl border border-mystic-600/30 bg-void px-3 py-2 text-mystic-50 outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-mystic-200/80">
          Birth date
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="rounded-xl border border-mystic-600/30 bg-void px-3 py-2 text-mystic-50 outline-none focus:border-gold"
          />
        </label>

        {previewSign && (
          <p className="text-center text-sm text-mystic-200/70">
            You are a <span className="text-gold">{previewSign.symbol} {previewSign.name}</span>. That explains a lot.
          </p>
        )}

        <button
          type="submit"
          disabled={!name.trim() || !birthDate}
          className="mt-2 rounded-xl bg-mystic-600 py-3 font-semibold text-white disabled:opacity-40"
        >
          Meet your companion
        </button>
      </form>
    </div>
  )
}
