import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getSignForDate, type ZodiacSign } from './zodiac'

export type SubscriptionTier = 'apprentice' | 'mystic' | 'oracle'
export type Gender = 'female' | 'male' | 'non-binary' | 'prefer-not-to-say'

export interface Wallet {
  coins: number
  gems: number
}

export interface UserProfile {
  email: string | null
  password: string
  name: string
  birthDate: string | null // ISO date, e.g. "1995-06-21"
  gender: Gender | null
  tier: SubscriptionTier
  unlockedMineralIds: string[]
  streak: number
  wallet: Wallet
  dossierRewarded: string[]
  firstRunComplete: boolean
  firstReadingChoice: 'unlock' | 'later' | null
  dossier: {
    birthTime: string
    birthPlace: string
    focusArea: string
    relationshipStatus: string
  }
}

const EMPTY_DOSSIER = { birthTime: '', birthPlace: '', focusArea: '', relationshipStatus: '' }
const DOSSIER_FIELD_REWARD_COINS = 25
export const WELCOME_GIFT: Wallet = { coins: 150, gems: 50 }

function blankProfile(email: string, password: string): UserProfile {
  return {
    email,
    password,
    name: '',
    birthDate: null,
    gender: null,
    tier: 'apprentice',
    unlockedMineralIds: ['quartz', 'amethyst'],
    streak: 1,
    wallet: { coins: 0, gems: 0 },
    dossierRewarded: [],
    firstRunComplete: false,
    firstReadingChoice: null,
    dossier: EMPTY_DOSSIER,
  }
}

const LOGGED_OUT_PROFILE: UserProfile = blankProfile(null as unknown as string, '')
LOGGED_OUT_PROFILE.email = null

// Pre-seeded demo logins for testing, per the two personas requested: a male
// tester (test1) and a female tester (test2). Each starts fresh (has to go
// through profile setup / guide / gift the first time) but keeps whatever
// state it accumulates across logins, like any other account here.
const SEED_ACCOUNTS: Record<string, UserProfile> = {
  test1: { ...blankProfile('test1', '1234') },
  test2: { ...blankProfile('test2', '1234') },
}

const ACCOUNTS_KEY = 'mystic-companion-accounts'
const SESSION_KEY = 'mystic-companion-session'
const LEGACY_PROFILE_KEY = 'mystic-companion-profile'

function normalize(identifier: string): string {
  return identifier.trim().toLowerCase()
}

function loadAccounts(): Record<string, UserProfile> {
  let stored: Record<string, UserProfile> = {}
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    if (raw) stored = JSON.parse(raw)
  } catch {
    stored = {}
  }

  // One-time migration from the old single-profile storage format.
  if (Object.keys(stored).length === 0) {
    try {
      const legacyRaw = localStorage.getItem(LEGACY_PROFILE_KEY)
      if (legacyRaw) {
        const legacy = JSON.parse(legacyRaw)
        if (legacy?.email) {
          stored = { [normalize(legacy.email)]: { ...blankProfile(legacy.email, ''), ...legacy } }
        }
      }
    } catch {
      // ignore malformed legacy data
    }
  }

  // Seed accounts fill in only where a real saved account doesn't already exist,
  // so any progress made while testing as test1/test2 persists across sessions.
  return { ...SEED_ACCOUNTS, ...stored }
}

function loadSession(): string | null {
  return localStorage.getItem(SESSION_KEY)
}

interface StoreValue {
  profile: UserProfile
  sign: ZodiacSign | null
  hasAccount: boolean
  isOnboarded: boolean
  isPremium: boolean
  setProfile: (updater: (prev: UserProfile) => UserProfile) => void
  register: (identifier: string, password: string) => 'ok' | 'exists'
  login: (identifier: string, password: string) => 'ok' | 'not-found' | 'wrong-password'
  logout: () => void
  completeOnboarding: (name: string, birthDate: string, gender: Gender) => void
  claimWelcomeGift: () => void
  recordFirstReading: (choice: 'unlock' | 'later') => void
  setTier: (tier: SubscriptionTier) => void
  unlockMineral: (mineralId: string) => void
  updateDossier: (fields: Partial<UserProfile['dossier']>) => void
  dossierCompletion: number
  earnCoins: (amount: number) => void
  earnGems: (amount: number) => void
  spendCoins: (amount: number) => boolean
  spendGems: (amount: number) => boolean
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Record<string, UserProfile>>(loadAccounts)
  const [sessionId, setSessionId] = useState<string | null>(loadSession)

  useEffect(() => {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
  }, [accounts])

  useEffect(() => {
    if (sessionId) localStorage.setItem(SESSION_KEY, sessionId)
    else localStorage.removeItem(SESSION_KEY)
  }, [sessionId])

  const profile = (sessionId ? accounts[sessionId] : undefined) ?? LOGGED_OUT_PROFILE

  function updateActive(updater: (prev: UserProfile) => UserProfile) {
    if (!sessionId) return
    setAccounts((prev) => ({ ...prev, [sessionId]: updater(prev[sessionId]) }))
  }

  const sign = useMemo(() => (profile.birthDate ? getSignForDate(new Date(profile.birthDate)) : null), [profile.birthDate])

  const dossierCompletion = useMemo(() => {
    const fields = Object.values(profile.dossier)
    const filled = fields.filter((f) => f.trim().length > 0).length
    return Math.round((filled / fields.length) * 100)
  }, [profile.dossier])

  const value: StoreValue = {
    profile,
    sign,
    hasAccount: Boolean(sessionId),
    isOnboarded: Boolean(profile.name && profile.birthDate && profile.gender),
    isPremium: profile.tier !== 'apprentice',
    setProfile: (updater) => updateActive(updater),
    register: (identifier, password) => {
      const id = normalize(identifier)
      if (accounts[id]) return 'exists'
      setAccounts((prev) => ({ ...prev, [id]: blankProfile(id, password) }))
      setSessionId(id)
      return 'ok'
    },
    login: (identifier, password) => {
      const id = normalize(identifier)
      const account = accounts[id]
      if (!account) return 'not-found'
      if (account.password !== password) return 'wrong-password'
      setSessionId(id)
      return 'ok'
    },
    logout: () => setSessionId(null),
    completeOnboarding: (name, birthDate, gender) => updateActive((prev) => ({ ...prev, name, birthDate, gender })),
    claimWelcomeGift: () =>
      updateActive((prev) =>
        prev.firstRunComplete
          ? prev
          : {
              ...prev,
              firstRunComplete: true,
              wallet: { coins: prev.wallet.coins + WELCOME_GIFT.coins, gems: prev.wallet.gems + WELCOME_GIFT.gems },
            },
      ),
    recordFirstReading: (choice) =>
      updateActive((prev) => (prev.firstReadingChoice ? prev : { ...prev, firstReadingChoice: choice })),
    setTier: (tier) => updateActive((prev) => ({ ...prev, tier })),
    unlockMineral: (mineralId) =>
      updateActive((prev) =>
        prev.unlockedMineralIds.includes(mineralId)
          ? prev
          : { ...prev, unlockedMineralIds: [...prev.unlockedMineralIds, mineralId] },
      ),
    updateDossier: (fields) =>
      updateActive((prev) => {
        const nextDossier = { ...prev.dossier, ...fields }
        const newlyRewarded: string[] = []
        let bonusCoins = 0
        for (const [key, value] of Object.entries(fields)) {
          const wasEmpty = !prev.dossier[key as keyof typeof prev.dossier].trim()
          const isNowFilled = Boolean(value && value.trim())
          const alreadyRewarded = prev.dossierRewarded.includes(key)
          if (wasEmpty && isNowFilled && !alreadyRewarded) {
            newlyRewarded.push(key)
            bonusCoins += DOSSIER_FIELD_REWARD_COINS
          }
        }
        return {
          ...prev,
          dossier: nextDossier,
          dossierRewarded: [...prev.dossierRewarded, ...newlyRewarded],
          wallet: { ...prev.wallet, coins: prev.wallet.coins + bonusCoins },
        }
      }),
    dossierCompletion,
    earnCoins: (amount) => updateActive((prev) => ({ ...prev, wallet: { ...prev.wallet, coins: prev.wallet.coins + amount } })),
    earnGems: (amount) => updateActive((prev) => ({ ...prev, wallet: { ...prev.wallet, gems: prev.wallet.gems + amount } })),
    spendCoins: (amount) => {
      if (profile.wallet.coins < amount) return false
      updateActive((prev) => ({ ...prev, wallet: { ...prev.wallet, coins: prev.wallet.coins - amount } }))
      return true
    },
    spendGems: (amount) => {
      if (profile.wallet.gems < amount) return false
      updateActive((prev) => ({ ...prev, wallet: { ...prev.wallet, gems: prev.wallet.gems - amount } }))
      return true
    },
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
