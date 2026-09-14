export interface DailyWord {
  free: string
  premium: string
  weekly: string
  yearly: string
}

// Deterministic mock content keyed by sign, standing in for real
// astrologer-written or AI-assisted copy served from a backend/CMS later.
export const DAILY_WORDS: Record<string, DailyWord> = {
  aries: {
    free: 'Slow down. Yes, you specifically.',
    premium: 'Your ruling planet Mars is pushing you toward action today, but the smart move is a pause before you reply to that message. The energy you save now, you spend better tomorrow.',
    weekly: 'This week rewards initiative over impulse. Start the thing, but read it twice before you send it.',
    yearly: 'A year of bold starts and, if you are honest with yourself, a few too many unfinished projects. Pick two. Finish those.',
  },
  taurus: {
    free: 'Comfort is not the enemy today.',
    premium: 'You have been pushing through when you should have been resting. Venus asks you to indulge a little — good food, soft fabric, no apologies.',
    weekly: 'Stability returns after a wobbly stretch. Use it to rebuild your routine, not just your bank account.',
    yearly: 'Financial groundwork laid this year pays off later than you would like, but it does pay off.',
  },
  gemini: {
    free: 'Pick one conversation and finish it.',
    premium: 'Mercury has you juggling five threads at once. Today, close one loop completely before opening another — it will feel strange and good.',
    weekly: 'Communication opens doors this week, but only if you listen as much as you talk.',
    yearly: 'A year defined by who you talk to. Choose your group chats wisely.',
  },
  cancer: {
    free: 'Check in on someone. Then check in on yourself.',
    premium: 'The Moon, your ruler, is asking you to tend your own emotional weather before managing everyone else\'s. Not selfish. Necessary.',
    weekly: 'Home matters more than usual this week — literally or emotionally.',
    yearly: 'A year of quietly rebuilding your sense of safety from the inside out.',
  },
  leo: {
    free: 'You do not need the whole room\'s approval.',
    premium: 'The Sun highlights your work today, but the validation you are craving has to start with you, or it will never feel like enough from anyone else.',
    weekly: 'Recognition is coming, possibly from somewhere unexpected. Accept it graciously.',
    yearly: 'A year where your reputation catches up to your actual effort. About time.',
  },
  virgo: {
    free: 'Good enough is, in fact, good enough.',
    premium: 'Mercury pushes your perfectionism into overdrive today. Ship the thing at 90%. The last 10% is a trap.',
    weekly: 'A messy week clarifies into a plan by Sunday. Trust the process, not the chaos.',
    yearly: 'A year of learning that "done" beats "perfect" more often than you would like to admit.',
  },
  libra: {
    free: 'Make the decision. Any decision.',
    premium: 'Venus wants harmony, but indecision is costing you more peace than either option would. Flip a coin if you have to.',
    weekly: 'Relationships need a direct conversation this week. Skip the hinting.',
    yearly: 'A year of choosing sides — in relationships, in work, in what you actually believe.',
  },
  scorpio: {
    free: 'Not everything is a conspiracy. Probably.',
    premium: 'Pluto intensifies your instincts today, and most of them are right — but not all of them. Verify before you confront.',
    weekly: 'Buried truths surface this week. Let them; you will feel lighter after.',
    yearly: 'A year of transformation you did not fully choose, but will be glad happened.',
  },
  sagittarius: {
    free: 'The plan can wait a day. Go outside.',
    premium: 'Jupiter is expanding your options faster than you can evaluate them. Today, pick the adventure that costs the least to undo.',
    weekly: 'Travel or learning opportunities appear this week — say yes before you overthink it.',
    yearly: 'A year that takes you further from home than expected, in every sense of the word.',
  },
  capricorn: {
    free: 'You are allowed to stop working now.',
    premium: 'Saturn rewards your discipline today, but even Saturn takes a day off. Set the laptop down before 9pm, this is not optional advice.',
    weekly: 'Career momentum builds this week. Document your wins, no one else will.',
    yearly: 'A year where the long game finally starts paying visible dividends.',
  },
  aquarius: {
    free: 'Weird is working for you today.',
    premium: 'Uranus is amplifying your instinct to do things differently. Trust it — the unconventional approach is the correct one this time.',
    weekly: 'A community or group project needs your specific brand of chaos this week.',
    yearly: 'A year of finding your people, even if it takes a few false starts.',
  },
  pisces: {
    free: 'That feeling you are ignoring is data.',
    premium: 'Neptune is blurring the line between intuition and wishful thinking today. Sit with the feeling for an hour before you act on it.',
    weekly: 'Creative work flows easily this week — capture it before the mood passes.',
    yearly: 'A year of turning a private inner world into something you can actually share.',
  },
}
