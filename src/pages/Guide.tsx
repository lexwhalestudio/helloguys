import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PublicShell } from '../components/PublicShell'
import { useStore } from '../lib/store'

interface Slide {
  emoji: string
  title: string
  body: string
}

const SLIDES: Slide[] = [
  {
    emoji: '🌟',
    title: 'Meet your Companion',
    body: "A daily word, a little humor, and someone who actually remembers your sign. Check in daily and your bond grows.",
  },
  {
    emoji: '🌙',
    title: 'Real moon, real tarot',
    body: 'Actual lunar phases — not decoration — plus a fresh tarot pull every day. Good timing, no fluff.',
  },
  {
    emoji: '💎',
    title: 'Collect minerals',
    body: 'Pull, collect, complete the set. Some are common, some are rare, some you will have to work for.',
  },
  {
    emoji: '💫',
    title: 'Compatibility, when you are ready',
    body: 'Fill out your Dossier, unlock Premium, and find out if it is actually written in the stars.',
  },
]

export function Guide() {
  const { profile } = useStore()
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const isLast = index === SLIDES.length - 1
  const slide = SLIDES[index]

  if (profile.firstRunComplete) return <Navigate to="/" replace />

  function goNext() {
    if (isLast) navigate('/gift')
    else setIndex((i) => i + 1)
  }

  return (
    <PublicShell>
      <div className="flex min-h-[80vh] flex-col">
        <div className="flex justify-end">
          <button onClick={() => navigate('/gift')} className="text-xs text-mystic-200/50 underline">
            Skip
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <span className="text-6xl">{slide.emoji}</span>
          <h1 className="font-display text-2xl text-gold">{slide.title}</h1>
          <p className="max-w-sm text-sm text-mystic-200/70">{slide.body}</p>
        </div>

        <div className="flex flex-col gap-4 pb-4">
          <div className="flex items-center justify-center gap-2">
            {SLIDES.map((s, i) => (
              <span
                key={s.title}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-gold' : 'w-1.5 bg-mystic-600/30'}`}
              />
            ))}
          </div>
          <button onClick={goNext} className="rounded-xl bg-mystic-600 py-3 font-semibold text-white">
            {isLast ? 'Get started' : 'Next'}
          </button>
        </div>
      </div>
    </PublicShell>
  )
}
