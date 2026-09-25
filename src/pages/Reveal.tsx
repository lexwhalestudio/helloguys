import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PublicShell } from '../components/PublicShell'
import { DAILY_WORDS } from '../data/dailyWords'
import { buildFirstReading, splitTeaser } from '../lib/firstReading'
import { getMoonPhase } from '../lib/moon'
import { useStore } from '../lib/store'

type Stage = 'idle' | 'revealing' | 'revealed'

const SUSPENSE_MS = 1600

export function Reveal() {
  const { profile, sign, recordFirstReading } = useStore()
  const navigate = useNavigate()
  const [stage, setStage] = useState<Stage>('idle')
  // Only treat this as a replay if the choice was already made when the screen
  // opened; the choice this screen records itself must not trigger the guard.
  const alreadyDone = useRef(Boolean(profile.firstReadingChoice))

  const moon = useMemo(() => getMoonPhase(), [])
  const reading = useMemo(
    () => (sign ? buildFirstReading(profile.name, sign, moon) : null),
    [profile.name, sign, moon],
  )
  const teaser = useMemo(() => (sign ? splitTeaser(DAILY_WORDS[sign.id].premium) : null), [sign])

  useEffect(() => {
    if (stage !== 'revealing') return
    const t = setTimeout(() => setStage('revealed'), SUSPENSE_MS)
    return () => clearTimeout(t)
  }, [stage])

  function finish(choice: 'unlock' | 'later') {
    recordFirstReading(choice)
    navigate(choice === 'unlock' ? '/upgrade' : '/')
  }

  if (alreadyDone.current) return <Navigate to="/" replace />
  if (!reading || !teaser) return null

  return (
    <PublicShell>
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
        {stage === 'idle' && (
          <>
            <span className="text-6xl">{moon.emoji}</span>
            <div>
              <h1 className="font-display text-2xl text-gold">The sky has something for you.</h1>
              <p className="mt-2 max-w-sm text-sm text-mystic-200/70">
                One reading, built from your sign and tonight's actual moon. It takes a second.
              </p>
            </div>
            <button
              onClick={() => setStage('revealing')}
              className="w-full rounded-xl bg-mystic-600 py-3 font-semibold text-white"
            >
              Tap to see what the stars found
            </button>
          </>
        )}

        {stage === 'revealing' && (
          <>
            <span className="animate-pulse text-6xl">✦</span>
            <p className="text-sm text-mystic-200/70">Reading the sky…</p>
          </>
        )}

        {stage === 'revealed' && (
          <div className="flex w-full flex-col gap-4">
            <div className="rounded-2xl border border-mystic-600/30 bg-void-light p-5 text-left">
              <p className="text-xs uppercase tracking-wide text-mystic-200/50">{reading.header}</p>
              <p className="mt-3 text-sm text-mystic-50">{reading.trait}</p>
              <p className="mt-3 text-sm text-mystic-50">{reading.timing}</p>
              <p className="mt-4 text-sm italic text-gold">{reading.openLoop}</p>
            </div>

            <div className="rounded-2xl border border-gold/40 bg-void-light p-5 text-left">
              <p className="text-xs uppercase tracking-wide text-gold">Your full reading for today</p>
              <p className="mt-3 text-sm text-mystic-50">{teaser.visible}</p>
              <div className="relative mt-1">
                <p className="select-none text-sm text-mystic-50 blur-[3px]">{teaser.hidden}</p>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void-light" />
              </div>
            </div>

            <button
              onClick={() => finish('unlock')}
              className="w-full rounded-xl bg-gold py-3 font-semibold text-void"
            >
              Unlock the rest
            </button>
            <button onClick={() => finish('later')} className="text-xs text-mystic-200/50 underline">
              Not now, take me in
            </button>
          </div>
        )}
      </div>
    </PublicShell>
  )
}
