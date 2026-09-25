import type { MoonPhase } from './moon'
import type { ZodiacSign } from './zodiac'

export interface FirstReading {
  header: string
  trait: string
  timing: string
  openLoop: string
}

const ELEMENT_TRAIT: Record<ZodiacSign['element'], string> = {
  Fire: 'You decide fast and regret slowly. People mistake that for confidence. Sometimes it is.',
  Earth: 'You hold things together for people who have never once noticed the effort. You noticed.',
  Air: "You've been talking your way around something instead of through it. It's a good trick. It's wearing thin.",
  Water: "You feel things before you can name them — and you've been feeling something for a while now.",
}

const MOON_TIMING: Record<string, string> = {
  'New Moon': "Something is starting that you haven't admitted you want yet.",
  'Waxing Crescent': 'The thing you started quietly is asking for more of you than you planned to give.',
  'First Quarter': "There's a decision you've been circling. It's closer than you're pretending.",
  'Waxing Gibbous': "You're almost there and getting impatient. That is exactly the dangerous part.",
  'Full Moon': 'Something is coming to a head. You already know what. You just wanted it in writing.',
  'Waning Gibbous': "You have something to say to someone, and you've been rehearsing it in the shower.",
  'Last Quarter': "You're carrying something that stopped being yours a while ago.",
  'Waning Crescent': "You're tired in a way sleep doesn't fix. That's information, not weakness.",
}

export function buildFirstReading(name: string, sign: ZodiacSign, moon: MoonPhase): FirstReading {
  return {
    header: `${name}, ${sign.symbol} ${sign.name}, under a ${moon.name.toLowerCase()}.`,
    trait: ELEMENT_TRAIT[sign.element],
    timing: MOON_TIMING[moon.name] ?? MOON_TIMING['New Moon'],
    openLoop: "There's a specific reason this is landing today. It's in your full reading.",
  }
}

// Cut the premium reading mid-thought at the first clause break, so the user can
// see there is more rather than just be told so. Falls back to a word-count cut
// for readings with no clause break, so a hidden portion always exists.
const MIN_VISIBLE_WORDS = 7

export function splitTeaser(text: string): { visible: string; hidden: string } {
  const words = text.split(/\s+/)
  let cut = -1
  for (let i = MIN_VISIBLE_WORDS; i < words.length - 3; i++) {
    if (/[,;:—]$/.test(words[i])) {
      cut = i + 1
      break
    }
  }
  if (cut === -1) cut = Math.max(MIN_VISIBLE_WORDS, Math.floor(words.length * 0.45))
  if (cut >= words.length) return { visible: text, hidden: '' }
  return { visible: words.slice(0, cut).join(' '), hidden: words.slice(cut).join(' ') }
}
