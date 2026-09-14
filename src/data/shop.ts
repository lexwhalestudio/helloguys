import type { MineralRarity } from './minerals'

export interface MineralPullOption {
  id: string
  name: string
  currency: 'coins' | 'gems'
  cost: number
  rarities: MineralRarity[]
  description: string
}

export const MINERAL_PULLS: MineralPullOption[] = [
  {
    id: 'common-pull',
    name: 'Common Pull',
    currency: 'coins',
    cost: 50,
    rarities: ['common', 'uncommon'],
    description: 'A Common or Uncommon mineral.',
  },
  {
    id: 'rare-pull',
    name: 'Rare Pull',
    currency: 'gems',
    cost: 150,
    rarities: ['rare'],
    description: 'Guaranteed Rare mineral.',
  },
  {
    id: 'legendary-pull',
    name: 'Legendary Pull',
    currency: 'gems',
    cost: 400,
    rarities: ['legendary'],
    description: 'Guaranteed Legendary mineral. The good stuff.',
  },
]

export interface ComingSoonItem {
  id: string
  name: string
  currency: 'coins' | 'gems'
  cost: number
  description: string
}

export const COMING_SOON_ITEMS: ComingSoonItem[] = [
  { id: 'chat-bundle', name: 'Extra Chat Messages (x15)', currency: 'coins', cost: 100, description: 'For when Companion Chat ships.' },
  { id: 'chat-pass', name: 'Unlimited Chat Pass (30 days)', currency: 'gems', cost: 450, description: 'For when Companion Chat ships.' },
  { id: 'cosmetic-common', name: 'Companion Outfit — Common', currency: 'coins', cost: 150, description: 'Companion cosmetics are on the roadmap.' },
  { id: 'natal-report', name: 'Full Natal Chart Report', currency: 'gems', cost: 300, description: 'A deep one-time reading.' },
  { id: 'yearly-forecast', name: 'Yearly Forecast Unlock', currency: 'gems', cost: 600, description: 'Buy the Oracle-exclusive forecast without subscribing.' },
  { id: 'remove-ads', name: 'Remove Ads (permanent)', currency: 'gems', cost: 250, description: 'No ads exist yet in this scaffold.' },
]

export interface CurrencyPack {
  id: string
  name: string
  amount: number
  bonusLabel?: string
  priceUsd: number
}

export const GEM_PACKS: CurrencyPack[] = [
  { id: 'spark', name: 'Spark', amount: 100, priceUsd: 0.99 },
  { id: 'glow', name: 'Glow', amount: 550, bonusLabel: '+10%', priceUsd: 4.99 },
  { id: 'radiance', name: 'Radiance', amount: 1200, bonusLabel: '+20%', priceUsd: 9.99 },
  { id: 'aura', name: 'Aura', amount: 2500, bonusLabel: '+25%', priceUsd: 19.99 },
  { id: 'ascendant', name: 'Ascendant', amount: 6500, bonusLabel: '+30%', priceUsd: 49.99 },
]

export const COIN_PACKS: CurrencyPack[] = [
  { id: 'pouch', name: 'Pouch', amount: 500, priceUsd: 0.99 },
  { id: 'satchel', name: 'Satchel', amount: 3000, bonusLabel: '+15%', priceUsd: 4.99 },
  { id: 'chest', name: 'Chest', amount: 7000, bonusLabel: '+25%', priceUsd: 9.99 },
]

export const COIN_EARN_ACTIONS = [
  { action: 'Daily login', amount: '10 coins' },
  { action: 'Complete daily tarot draw', amount: '5 coins' },
  { action: 'Complete daily horoscope read', amount: '5 coins' },
  { action: '7-day login streak bonus', amount: '50 coins' },
  { action: 'Fill a Dossier field (one-time each)', amount: '25 coins' },
  { action: 'Share a daily-word card', amount: '15 coins' },
]
