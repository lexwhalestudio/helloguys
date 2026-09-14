import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAge, MIN_AGE } from '../lib/age'
import { getSignForDate } from '../lib/zodiac'
import { useStore, type Gender } from '../lib/store'

const GENDER_OPTIONS: Array<{ value: Gender; label: string }> = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

export function Onboarding() {
  const { completeOnboarding } = useStore()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState<Gender | ''>('')
  const [ageError, setAgeError] = useState<string | null>(null)

  const previewSign = birthDate ? getSignForDate(new Date(birthDate)) : null
  const canSubmit = Boolean(name.trim() && birthDate && gender)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || !gender) return

    const age = getAge(birthDate)
    if (age < MIN_AGE) {
      setAgeError(`Mystic Companion is for adults ${MIN_AGE} and up. Come back when the stars have caught up with you.`)
      return
    }
    setAgeError(null)

    completeOnboarding(name.trim(), birthDate, gender)
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
            onChange={(e) => {
              setBirthDate(e.target.value)
              setAgeError(null)
            }}
            className="rounded-xl border border-mystic-600/30 bg-void px-3 py-2 text-mystic-50 outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-mystic-200/80">
          Gender
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="rounded-xl border border-mystic-600/30 bg-void px-3 py-2 text-mystic-50 outline-none focus:border-gold"
          >
            <option value="" disabled>
              Select one
            </option>
            {GENDER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        {previewSign && (
          <p className="text-center text-sm text-mystic-200/70">
            You are a <span className="text-gold">{previewSign.symbol} {previewSign.name}</span>. That explains a lot.
          </p>
        )}

        {ageError && <p className="text-center text-sm text-red-400">{ageError}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 rounded-xl bg-mystic-600 py-3 font-semibold text-white disabled:opacity-40"
        >
          Meet your companion
        </button>

        <p className="text-center text-[11px] text-mystic-200/40">
          By continuing you confirm you are {MIN_AGE} or older. See our{' '}
          <Link to="/privacy" className="underline">
            Privacy Policy
          </Link>{' '}
          for how your data is used.
        </p>
      </form>
    </div>
  )
}
