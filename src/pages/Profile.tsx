import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { useStore } from '../lib/store'

export function Profile() {
  const { profile, sign, dossierCompletion, updateDossier, logout } = useStore()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col items-center gap-1 text-center">
        <span className="text-4xl">{sign?.symbol ?? '✨'}</span>
        <h1 className="font-display text-lg text-gold">{profile.name}</h1>
        <p className="text-sm text-mystic-200/70">{sign?.name}</p>
      </Card>

      <Card>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-wide text-mystic-200/50">Cosmic Dossier</h2>
          <span className="text-xs text-gold">{dossierCompletion}%</span>
        </div>
        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-void">
          <div className="h-full bg-gold" style={{ width: `${dossierCompletion}%` }} />
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm text-mystic-200/80">
            Birth time (optional, sharpens your reading)
            <input
              type="time"
              value={profile.dossier.birthTime}
              onChange={(e) => updateDossier({ birthTime: e.target.value })}
              className="rounded-xl border border-mystic-600/30 bg-void px-3 py-2 text-mystic-50 outline-none focus:border-gold"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-mystic-200/80">
            Birth place
            <input
              value={profile.dossier.birthPlace}
              onChange={(e) => updateDossier({ birthPlace: e.target.value })}
              placeholder="City, country"
              className="rounded-xl border border-mystic-600/30 bg-void px-3 py-2 text-mystic-50 outline-none focus:border-gold"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-mystic-200/80">
            What are you focused on right now?
            <input
              value={profile.dossier.focusArea}
              onChange={(e) => updateDossier({ focusArea: e.target.value })}
              placeholder="Career, love, healing, chaos..."
              className="rounded-xl border border-mystic-600/30 bg-void px-3 py-2 text-mystic-50 outline-none focus:border-gold"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-mystic-200/80">
            Relationship status
            <input
              value={profile.dossier.relationshipStatus}
              onChange={(e) => updateDossier({ relationshipStatus: e.target.value })}
              placeholder="It's complicated, probably"
              className="rounded-xl border border-mystic-600/30 bg-void px-3 py-2 text-mystic-50 outline-none focus:border-gold"
            />
          </label>
        </div>
      </Card>

      <button
        onClick={handleLogout}
        className="rounded-xl border border-mystic-600/30 py-3 text-sm font-semibold text-mystic-200/70"
      >
        Log out (reset this device's test profile)
      </button>
    </div>
  )
}
