export type MineralRarity = 'common' | 'uncommon' | 'rare' | 'legendary'

export interface Mineral {
  id: string
  name: string
  emoji: string
  rarity: MineralRarity
  meaning: string
  premiumOnly: boolean
}

export const MINERALS: Mineral[] = [
  { id: 'quartz', name: 'Clear Quartz', emoji: '🔮', rarity: 'common', meaning: 'The "default setting" of crystals. Amplifies whatever you point it at.', premiumOnly: false },
  { id: 'amethyst', name: 'Amethyst', emoji: '💜', rarity: 'common', meaning: 'Calm, clarity, and a great excuse to buy purple things.', premiumOnly: false },
  { id: 'rose-quartz', name: 'Rose Quartz', emoji: '🩷', rarity: 'uncommon', meaning: 'Self-love. Yes, that includes forgiving yourself for that text.', premiumOnly: false },
  { id: 'citrine', name: 'Citrine', emoji: '🟡', rarity: 'uncommon', meaning: 'Abundance and confidence. The mineral equivalent of "fake it till you make it."', premiumOnly: false },
  { id: 'moonstone', name: 'Moonstone', emoji: '🌙', rarity: 'rare', meaning: 'New beginnings tied to lunar cycles. Very on-brand for this app.', premiumOnly: true },
  { id: 'labradorite', name: 'Labradorite', emoji: '🌌', rarity: 'rare', meaning: 'Transformation and hidden potential. Flashy on the outside, deep on the inside.', premiumOnly: true },
  { id: 'malachite', name: 'Malachite', emoji: '🟢', rarity: 'rare', meaning: 'Protection through change. Also just extremely good-looking.', premiumOnly: true },
  { id: 'black-tourmaline', name: 'Black Tourmaline', emoji: '⚫', rarity: 'rare', meaning: 'Grounding and boundary-setting. The "do not disturb" of crystals.', premiumOnly: true },
  { id: 'star-sapphire', name: 'Star Sapphire', emoji: '✨', rarity: 'legendary', meaning: 'Rare, luminous, and slightly extra — much like you on a good day.', premiumOnly: true },
  { id: 'phoenix-opal', name: 'Phoenix Opal', emoji: '🔥', rarity: 'legendary', meaning: 'Renewal after hardship. Only appears to those who have earned it (or paid for it).', premiumOnly: true },
]

export const RARITY_LABEL: Record<MineralRarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  legendary: 'Legendary',
}
