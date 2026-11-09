import { departments } from './world'

// MIRABLOOM: "Look! It’s blooming!", the first thing a visitor ever said about this planet.
// Twelve Realms group the 31 sectors of life. Each Realm is a place you can enter.
export const realms = [
  { id: 'voyage', name: 'The Travel Realm', short: 'Travel', color: '#7dd3fc', scene: 'transport', layout: 'panorama', guide: 'dott', seed: 1,
    tag: 'Where people hop on sky-whales and visit wonderful places.', does: ['Ride a sky-whale', 'Pick a Wonder Spot', 'Stay in a Welcome Hut'], sectors: ['transport', 'tourism', 'hospitality'] },
  { id: 'daily', name: 'The Daily Life Realm', short: 'Daily Life', color: '#bef264', scene: 'daily-life', layout: 'panorama', guide: 'pim', seed: 2,
    tag: 'Where people wake up, play, eat snacks and go to bed. See a whole day!', does: ['See the Seven Happy Hours', 'Peek inside a treetop home', 'Send a message-bird'], sectors: ['daily-life', 'housing', 'communication'] },
  { id: 'kitchen', name: 'The Food Realm', short: 'Food', color: '#ffb347', scene: 'food', layout: 'panorama', guide: 'bubbo', seed: 3,
    tag: 'Where friends cook and eat together, and giant flowers glow in the garden.', does: ['Pick a yummy dish', 'See what’s inside it', 'Visit the Glow Gardens'], sectors: ['food', 'nature'] },
  { id: 'knowledge', name: 'The Knowledge Realm', short: 'Learning', color: '#3ff2d0', scene: 'education', layout: 'road', guide: 'nilla', seed: 4,
    tag: 'Where kids learn by playing. There are no classrooms, only Wonder Wagons!', does: ['Plan your Wagon Day', 'Go to the Show-and-Share Fair', 'Peek at the wagons'], sectors: ['education', 'science'] },
  { id: 'trade', name: 'The Work & Swap Realm', short: 'Work & Swap', color: '#fb7185', scene: 'business', layout: 'panorama', guide: 'tolu', seed: 5,
    tag: 'Where grown-ups try new jobs, swap things at stalls and say thank you with pebbles.', does: ['Try a new job', 'Visit a swap stall', 'Meet a helper bot'], sectors: ['work', 'business', 'economy-tech'] },
  { id: 'governance', name: 'The Helpers & Rules Realm', short: 'Leaders & Rules', color: '#5eead4', scene: 'government', layout: 'assembly', guide: 'hattie', seed: 6,
    tag: 'Where the village decides things together, with only three kind rules.', does: ['Wear the Big Hat', 'Cast a pebble vote', 'Learn the Three Kind Rules'], sectors: ['government', 'laws', 'safety'] },
  { id: 'care', name: 'The Cosy Care Realm', short: 'Care & Sleep', color: '#86efac', scene: 'healthcare', layout: 'panorama', guide: 'fenn', seed: 7,
    tag: 'Where people get better with soup and stories, and sleep on soft clouds.', does: ['Breathe like a sleepy whale', 'Visit the Cuddle Clouds'], sectors: ['healthcare', 'rest'] },
  { id: 'gaming', name: 'The Gaming Realm', short: 'Games', color: '#ff7a8a', scene: 'gaming', layout: 'arena', guide: 'zip', seed: 8,
    tag: 'Where friends play three brand-new games, and the winner always shares.', does: ['Play 3 games', 'Meet the players', 'Share the ribbons'], sectors: ['gaming', 'awards'] },
  { id: 'cinema', name: 'The Cinema Realm', short: 'Movies & Music', color: '#a78bfa', scene: 'cinema', layout: 'theatre', guide: 'lulu', seed: 9,
    tag: 'Where movies play on giant clouds and the audience picks what happens next.', does: ['Choose a movie', 'Pick the ending', 'Join a hum-along'], sectors: ['cinema', 'music', 'fashion'] },
  { id: 'festival', name: 'The Festival Realm', short: 'Parties', color: '#f9a8d4', scene: 'festivals', layout: 'panorama', guide: 'pomp', seed: 10,
    tag: 'Where there is a silly party almost every week.', does: ['Try Backwards Day', 'Make a silly hat', 'Read the Story Walls'], sectors: ['festivals', 'history'] },
  { id: 'leisure', name: 'The Free Time Realm', short: 'Free Time', color: '#c4f06a', scene: 'hobbies', layout: 'panorama', guide: 'juno', seed: 11,
    tag: 'Where people go after school and work: hobby clubs, playgrounds and weekend adventures.', does: ['Join a hobby club', 'Paint a cloud', 'Open the Boredom Box'], sectors: ['hobbies', 'recreation', 'playgrounds'] },
  { id: 'friends', name: 'The Friends Realm', short: 'Friends', color: '#fda4af', scene: 'friends', layout: 'panorama', guide: 'kiki', seed: 12,
    tag: 'Where strangers become friends, families eat together and everyone says hello.', does: ['Learn the Friendship Customs', 'Meet the neighbours', 'Join a family table'], sectors: ['friends', 'family', 'society'] },
]
export const realmById = Object.fromEntries(realms.map((r) => [r.id, r]))
export const realmOf = Object.fromEntries(realms.flatMap((r) => r.sectors.map((s) => [s, r])))
export const journey = realms.map((r) => r.id) // the order a visitor naturally travels

export const people = [
  { id: 'dott', name: 'Captain Dott', role: 'Sky-Whale Driver', kind: 'oar', color: '#7dd3fc', realm: 'voyage', quote: 'Hop on! My whale loves passengers who sing.' },
  { id: 'pim', name: 'Pim', role: 'Morning Bell Ringer', kind: 'bell', color: '#fbbf24', realm: 'daily', quote: 'Ding dong! Time to wake up and say hello!' },
  { id: 'bubbo', name: 'Chef Bubbo', role: 'Cloud Pancake Maker', kind: 'ladle', color: '#ffb347', realm: 'kitchen', quote: 'The secret ingredient is always a friend.' },
  { id: 'nilla', name: 'Teacher Nilla', role: 'Wagon Driver', kind: 'book', color: '#3ff2d0', realm: 'knowledge', quote: 'Today we’re learning about bubbles. Who wants to blow one?' },
  { id: 'tolu', name: 'Tolu', role: 'Swap-Stall Keeper', kind: 'scroll', color: '#fb7185', realm: 'trade', quote: 'I’ll swap you a hat for a song!' },
  { id: 'hattie', name: 'Grandma Hattie', role: 'Big Hat Wearer this month', kind: 'hat', color: '#5eead4', realm: 'governance', quote: 'The hat is heavy but my friends help me carry it.' },
  { id: 'fenn', name: 'Doctor Fenn', role: 'Cosy Doctor', kind: 'glass', color: '#86efac', realm: 'care', quote: 'First, soup. Then we’ll see.' },
  { id: 'zip', name: 'Coach Zip', role: 'Games Coach', kind: 'ball', color: '#ff7a8a', realm: 'gaming', quote: 'It doesn’t matter who wins. Hop higher!' },
  { id: 'lulu', name: 'Director Lulu', role: 'Cloud Cinema Maker', kind: 'scroll', color: '#a78bfa', realm: 'cinema', quote: 'You choose what happens next, so be brave!' },
  { id: 'pomp', name: 'Old Mr. Pomp', role: 'Keeper of Parties', kind: 'pole', color: '#f9a8d4', realm: 'festival', quote: 'Is it Tuesday? Perfect day for a parade!' },
  { id: 'juno', name: 'Juno', role: 'Hobby Club Leader', kind: 'drum', color: '#a3e635', realm: 'leisure', quote: 'Bored? Never! Come and try something new.' },
  { id: 'kiki', name: 'Kiki', role: 'Welcome Greeter', kind: 'flower', color: '#fda4af', realm: 'friends', quote: 'Hello! I’m so happy you’re here. Let’s be friends!' },
]
export const peopleById = Object.fromEntries(people.map((p) => [p.id, p]))

export const sectorById = Object.fromEntries(departments.map((d) => [d.id, d]))
