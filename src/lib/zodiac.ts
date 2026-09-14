export interface ZodiacSign {
  id: string
  name: string
  symbol: string
  element: 'Fire' | 'Earth' | 'Air' | 'Water'
  dateRange: string
}

const SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'Aries', symbol: '♈', element: 'Fire', dateRange: 'Mar 21 - Apr 19' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', element: 'Earth', dateRange: 'Apr 20 - May 20' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', element: 'Air', dateRange: 'May 21 - Jun 20' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', element: 'Water', dateRange: 'Jun 21 - Jul 22' },
  { id: 'leo', name: 'Leo', symbol: '♌', element: 'Fire', dateRange: 'Jul 23 - Aug 22' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', element: 'Earth', dateRange: 'Aug 23 - Sep 22' },
  { id: 'libra', name: 'Libra', symbol: '♎', element: 'Air', dateRange: 'Sep 23 - Oct 22' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', element: 'Water', dateRange: 'Oct 23 - Nov 21' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', element: 'Fire', dateRange: 'Nov 22 - Dec 21' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', element: 'Earth', dateRange: 'Dec 22 - Jan 19' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', element: 'Air', dateRange: 'Jan 20 - Feb 18' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', element: 'Water', dateRange: 'Feb 19 - Mar 20' },
]

// (month, day) cutoffs — a date on/after the cutoff belongs to that sign,
// wrapping from Capricorn (Dec 22) through to Capricorn's end (Jan 19).
const CUTOFFS: Array<{ month: number; day: number; signId: string }> = [
  { month: 1, day: 20, signId: 'aquarius' },
  { month: 2, day: 19, signId: 'pisces' },
  { month: 3, day: 21, signId: 'aries' },
  { month: 4, day: 20, signId: 'taurus' },
  { month: 5, day: 21, signId: 'gemini' },
  { month: 6, day: 21, signId: 'cancer' },
  { month: 7, day: 23, signId: 'leo' },
  { month: 8, day: 23, signId: 'virgo' },
  { month: 9, day: 23, signId: 'libra' },
  { month: 10, day: 23, signId: 'scorpio' },
  { month: 11, day: 22, signId: 'sagittarius' },
  { month: 12, day: 22, signId: 'capricorn' },
]

export function getSignForDate(date: Date): ZodiacSign {
  const month = date.getMonth() + 1
  const day = date.getDate()

  let signId = 'capricorn'
  for (const cutoff of CUTOFFS) {
    if (month > cutoff.month || (month === cutoff.month && day >= cutoff.day)) {
      signId = cutoff.signId
    }
  }

  return SIGNS.find((s) => s.id === signId)!
}

export function getAllSigns(): ZodiacSign[] {
  return SIGNS
}
