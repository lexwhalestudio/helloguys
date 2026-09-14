import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getSignForDate, type ZodiacSign } from './zodiac'

export type SubscriptionTier = 'apprentice' | 'mystic' | 'oracle'

export interface UserProfile {
  name: string
  birthDate: string | null // ISO date, e.g. "1995-06-21"
  tier: SubscriptionTier
  unlockedMineralIds: string[]
  streak: number
  dossier: {
    birthTime: string
    birthPlace: string
    focusArea: string
    relationshipStatus: string
  }
}

const EMPTY_DOSSIER = { birthTime: '', birthPlace: '', focusArea: '', relationshipStatus: '' }

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  birthDate: null,
  tier: 'apprentice',
  unlockedMineralIds: ['quartz', 'amethyst'],
  streak: 1,
  dossier: EMPTY_DOSSIER,
}

const STORAGE_KEY = 'mystic-companion-profile'

interface StoreValue {
  profile: UserProfile
  sign: ZodiacSign | null
  isOnboarded: boolean
  isPremium: boolean
  setProfile: (updater: (prev: UserProfile) => UserProfile) => void
  completeOnboarding: (name: string, birthDate: string) => void
  setTier: (tier: SubscriptionTier) => void
  unlockMineral: (mineralId: string) => void
  updateDossier: (fields: Partial<UserProfile['dossier']>) => void
  dossierCompletion: number
}

const StoreContext = createContext<StoreValue | null>(null)

function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PROFILE
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_PROFILE
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(loadProfile)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  const sign = useMemo(() => (profile.birthDate ? getSignForDate(new Date(profile.birthDate)) : null), [profile.birthDate])

  const dossierCompletion = useMemo(() => {
    const fields = Object.values(profile.dossier)
    const filled = fields.filter((f) => f.trim().length > 0).length
    return Math.round((filled / fields.length) * 100)
  }, [profile.dossier])

  const value: StoreValue = {
    profile,
    sign,
    isOnboarded: Boolean(profile.name && profile.birthDate),
    isPremium: profile.tier !== 'apprentice',
    setProfile: (updater) => setProfileState(updater),
    completeOnboarding: (name, birthDate) => setProfileState((prev) => ({ ...prev, name, birthDate })),
    setTier: (tier) => setProfileState((prev) => ({ ...prev, tier })),
    unlockMineral: (mineralId) =>
      setProfileState((prev) =>
        prev.unlockedMineralIds.includes(mineralId)
          ? prev
          : { ...prev, unlockedMineralIds: [...prev.unlockedMineralIds, mineralId] },
      ),
    updateDossier: (fields) => setProfileState((prev) => ({ ...prev, dossier: { ...prev.dossier, ...fields } })),
    dossierCompletion,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
