export interface TarotCard {
  id: string
  name: string
  emoji: string
  upright: string
  reversed: string
}

export const TAROT_DECK: TarotCard[] = [
  { id: 'fool', name: 'The Fool', emoji: '🃏', upright: 'New beginnings. Leap first, pack a parachute later.', reversed: 'Recklessness. Maybe read the instructions this once.' },
  { id: 'magician', name: 'The Magician', emoji: '🪄', upright: 'You have every tool you need. Stop waiting for permission.', reversed: 'Manipulation or wasted potential. Check your intentions.' },
  { id: 'high-priestess', name: 'The High Priestess', emoji: '🌙', upright: 'Trust the quiet knowing. Not everything needs an explanation.', reversed: 'Secrets are surfacing whether you like it or not.' },
  { id: 'empress', name: 'The Empress', emoji: '🌿', upright: 'Abundance, creativity, growth. Let something bloom.', reversed: 'Burnout from giving too much. Refill your own cup.' },
  { id: 'emperor', name: 'The Emperor', emoji: '👑', upright: 'Structure and discipline pay off now. Make the spreadsheet.', reversed: 'Rigidity. You can let go of the plan a little.' },
  { id: 'lovers', name: 'The Lovers', emoji: '💞', upright: 'A real choice in front of you. Choose with your values, not your fear.', reversed: 'Misalignment. A relationship needs an honest conversation.' },
  { id: 'wheel', name: 'Wheel of Fortune', emoji: '🎡', upright: 'A turning point. The universe is shuffling the deck, literally.', reversed: 'Resisting change that is coming anyway. Bad time to be stubborn.' },
  { id: 'strength', name: 'Strength', emoji: '🦁', upright: 'Gentle persistence beats brute force. You are tougher than you think.', reversed: 'Self-doubt. Stop arguing with yourself, you will lose.' },
  { id: 'hermit', name: 'The Hermit', emoji: '🏮', upright: 'Time alone will answer what noise cannot. Go be quiet somewhere.', reversed: 'Isolation past its usefulness. Text someone back.' },
  { id: 'star', name: 'The Star', emoji: '⭐', upright: 'Hope, healing, a quiet renewal of faith in the plan.', reversed: 'Discouragement. The dry spell is not permanent, promise.' },
  { id: 'moon', name: 'The Moon', emoji: '🌕', upright: 'Things are not fully clear yet, and that is fine. Trust the process anyway.', reversed: 'Anxiety fed by things you cannot control. Put the phone down.' },
  { id: 'sun', name: 'The Sun', emoji: '☀️', upright: 'Straightforward good fortune. Enjoy it without overthinking it.', reversed: 'Delayed joy, not denied joy. It is coming.' },
]
