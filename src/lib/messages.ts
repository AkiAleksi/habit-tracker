/**
 * Developer growth messages for different contexts
 * Encouraging professional development, no guilt-tripping!
 */

export const messages = {
  morning: [
    'Uusi päivä, uusi mahdollisuus oppia!',
    'Kasva 1% tänään. Mitä opit?',
    'Aamu on paras aika deep workille.',
    'Jokainen senior dev oli joskus junior.',
    'Tänään on hyvä päivä commitoida itsensä kehittämiseen.',
  ],

  afternoon: [
    'Miten päiväsi sujuu? Oletko oppinut jotain uutta?',
    'Compound interest toimii myös osaamisessa.',
    'Pienet päivittäiset teot → suuri ammatillinen kasvu.',
    'Tämän päivän oppiminen on huomisen tuottavuus.',
    'Build, learn, iterate – myös itsellesi.',
  ],

  evening: [
    'Illalla on hyvä hetki reflektoida päivän oppeja.',
    'Hyvää työtä tänään! Pienikin edistys vie eteenpäin.',
    'TIL-hetki? Kirjaa päivän opit ylös.',
    'Hyvä lopetus päivälle. Muista levätä!',
    'Code review itsellesi: mitä opit tänään?',
  ],

  allDone: [
    '100% – Olet todellinen growth hacker!',
    'Kaikki tehty! Stack overflow of productivity.',
    'Full commit – kaikki tavat mergattu!',
    'Deploy complete! Upea päivä.',
    'Achievement unlocked: Daily growth routine!',
  ],

  encouragement: [
    'Johdonmukaisuus > intensiteetti.',
    'Olet oikealla tiellä! Keep shipping.',
    'Jatka samaan malliin! Progress > perfection.',
    'Jokainen tapa vie eteenpäin. Iterate!',
    'Sinä pystyt tähän! Debug, adapt, overcome.',
  ],

  streakMilestones: {
    7: '7 päivän putki! Johdonmukaisuus maksaa. 🎉',
    14: '2 viikkoa! Olet buildannut oikean habitin! 🌟',
    30: 'Kuukausi! Tästä on tehty seniorit. 🏆',
    60: '60 päivää! Olet koodarieliitin kärkijoukkoa! 💪',
    100: '100 päivää! Stack level: Legendary! 👑',
    365: 'Vuosi! Open source -tason sitoutuminen! 🎊',
  } as Record<number, string>,
};

/**
 * Get a random message from an array
 */
function getRandomMessage(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Get time-appropriate greeting
 */
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) {
    return getRandomMessage(messages.morning);
  } else if (hour < 17) {
    return getRandomMessage(messages.afternoon);
  } else {
    return getRandomMessage(messages.evening);
  }
}

/**
 * Get progress-based message
 */
export function getProgressMessage(completed: number, total: number): string {
  if (total === 0) return 'Lisää ensimmäinen kehitystavastasi!';
  if (completed === 0) return getRandomMessage(messages.encouragement);
  if (completed === total) return getRandomMessage(messages.allDone);
  if (completed >= total / 2) return 'Hyvä tahti! Keep shipping.';
  return getRandomMessage(messages.encouragement);
}

/**
 * Get milestone message for streak
 */
export function getStreakMilestoneMessage(streak: number): string | null {
  return messages.streakMilestones[streak] || null;
}
