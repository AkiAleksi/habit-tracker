/**
 * Supportive messages for different contexts
 * No guilt-tripping, only encouragement!
 */

export const messages = {
  morning: [
    'Hyvää huomenta! Tänään on uusi mahdollisuus.',
    'Uusi päivä, uudet mahdollisuudet!',
    'Aamun pienet askeleet vievät pitkälle.',
    'Hyvää huomenta! Miten voit tänään?',
    'Tervetuloa uuteen päivään!',
  ],

  afternoon: [
    'Miten päiväsi sujuu?',
    'Jokainen askel vie lähemmäs tavoitetta.',
    'Pienet teot, suuret tulokset.',
    'Olet matkalla parempaan.',
    'Hienoa työtä! Jatka samaan malliin.',
  ],

  evening: [
    'Illalla on hyvä hetki tarkistaa päivän edistyminen.',
    'Miten päiväsi on sujunut?',
    'Muista levätä hyvin!',
    'Rauhallista iltaa!',
    'Hyvää työtä tänään!',
  ],

  allDone: [
    'Mahtavaa! Olet tehnyt kaikki tavat tänään!',
    'Täydellinen päivä! Olet sankari!',
    'Kaikki tehty! Nauti onnistumisesta.',
    'Upea suoritus! Kaikki tavat tehty!',
    'Loistavaa! Olet voittaja!',
  ],

  encouragement: [
    'Hyvä alku! Pidä vauhtia yllä.',
    'Olet oikealla tiellä!',
    'Jatka samaan malliin!',
    'Jokainen tapa vie eteenpäin.',
    'Sinä pystyt tähän!',
  ],

  streakMilestones: {
    7: 'Viikko putkeen! Upea suoritus! 🎉',
    14: 'Kaksi viikkoa! Olet todella sitoutunut! 🌟',
    30: 'Kuukausi! Olet mestari! 🏆',
    60: 'Kaksi kuukautta! Legendaarista! 💪',
    100: '100 päivää! Olet inspiraatio! 👑',
    365: 'Kokonainen vuosi! Uskomaton saavutus! 🎊',
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
  if (total === 0) return 'Lisää ensimmäinen tapasi!';
  if (completed === 0) return getRandomMessage(messages.encouragement);
  if (completed === total) return getRandomMessage(messages.allDone);
  if (completed >= total / 2) return 'Hienoa työtä! Jatka samaan malliin.';
  return getRandomMessage(messages.encouragement);
}

/**
 * Get milestone message for streak
 */
export function getStreakMilestoneMessage(streak: number): string | null {
  return messages.streakMilestones[streak] || null;
}
