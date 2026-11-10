import { departments } from './world'

// THALUNE: "the water that remembers light" in the Wickfolk tongue.
// Ten Realms group the 28 sectors of life. Each Realm is a place you can enter.
export const realms = [
  { id: 'voyage', name: 'The Voyage Realm', short: 'Voyage', color: '#7dd3fc', scene: 'transport', layout: 'panorama', guide: 'sael', seed: 1,
    tag: 'Where Thalune travels: current lines, far shores and inns with a lit window.', does: ['Ride a current line', 'Visit the far strands', 'Knock on a lit window'], sectors: ['transport', 'tourism', 'hospitality'] },
  { id: 'daily', name: 'The Daily Life Realm', short: 'Daily Life', color: '#bef264', scene: 'daily-life', layout: 'panorama', guide: 'oru', seed: 2,
    tag: 'Where Thalune lives: the Seven Hours, shell-houses, neighbours and bell-messages.', does: ['Read the Seven Hours', 'Step into a shell-house', 'Ring a message'], sectors: ['daily-life', 'housing', 'society', 'communication'] },
  { id: 'kitchen', name: 'The Kitchen Realm', short: 'Food', color: '#ffb347', scene: 'food', layout: 'panorama', guide: 'brann', seed: 3,
    tag: 'Where Thalune eats: glowing dishes, ember hearths and a garden that is alive.', does: ['Taste four dishes', 'Choose your table', 'Meet the fog-farmers'], sectors: ['food', 'nature'] },
  { id: 'knowledge', name: 'The Knowledge Realm', short: 'Knowledge', color: '#3ff2d0', scene: 'education', layout: 'road', guide: 'pip', seed: 4,
    tag: 'Where Thalune learns: no schools, only a road with six stages and a sea of questions.', does: ['Walk the learning road', 'Take a Lamplight Trial', 'Find your Guild'], sectors: ['education', 'science'] },
  { id: 'trade', name: 'The Trade Realm', short: 'Work & Trade', color: '#fb7185', scene: 'business', layout: 'panorama', guide: 'tolu', seed: 5,
    tag: 'Where Thalune works and trades: Guilds, open stalls and the light-ledger.', does: ['Visit the open stalls', 'Switch Guilds', 'Trade in lumen-beads'], sectors: ['work', 'business', 'economy-tech'] },
  { id: 'governance', name: 'The Governance Realm', short: 'Government & Justice', color: '#5eead4', scene: 'government', layout: 'assembly', guide: 'vey', seed: 6,
    tag: 'Where Thalune decides: lent light, the Salt Court and the Watch Lamps.', does: ['Lend your wicks', 'Carve the tenth law', 'Ring the Hush Bell'], sectors: ['government', 'laws', 'safety'] },
  { id: 'care', name: 'The Care Realm', short: 'Care & Rest', color: '#86efac', scene: 'healthcare', layout: 'panorama', guide: 'ysa', seed: 7,
    tag: 'Where Thalune heals and sleeps: living reefs, shared sleep and the family who lights your wick.', does: ['Breathe with the reef', 'Visit the sleep reefs', 'Meet a Wick Line'], sectors: ['healthcare', 'rest', 'family'] },
  { id: 'gaming', name: 'The Gaming Realm', short: 'Games', color: '#ff7a8a', scene: 'gaming', layout: 'arena', guide: 'mara', seed: 8,
    tag: 'Where Thalune plays: three original sports, great arenas and the Glow Crown ceremony.', does: ['Play 3 original sports', 'Meet the athletes', 'Watch a crowning'], sectors: ['gaming', 'recreation', 'awards'] },
  { id: 'cinema', name: 'The Cinema Realm', short: 'Cinema & Music', color: '#a78bfa', scene: 'cinema', layout: 'theatre', guide: 'ino', seed: 9,
    tag: 'Where Thalune dreams together: shared-sleep films, posters and hum choirs.', does: ['Browse dreamed films', 'Dream your own film', 'Conduct a hum choir'], sectors: ['cinema', 'music', 'fashion'] },
  { id: 'festival', name: 'The Festival Realm', short: 'Festivals & History', color: '#f9a8d4', scene: 'festivals', layout: 'panorama', guide: 'kesh', seed: 10,
    tag: 'Where Thalune celebrates and remembers: lantern nights and the wax archives.', does: ['Release a lantern', 'Touch the wax walls', 'Hear the old stories'], sectors: ['festivals', 'history'] },
]
export const realmById = Object.fromEntries(realms.map((r) => [r.id, r]))
export const realmOf = Object.fromEntries(realms.flatMap((r) => r.sectors.map((s) => [s, r])))
export const journey = realms.map((r) => r.id) // the order a visitor naturally travels

export const people = [
  { id: 'sael', name: 'Ember Sael', role: 'Shore Guide', kind: 'lamp', color: '#7dd3fc', realm: 'voyage', quote: 'You came. Few do. Take your light and walk.' },
  { id: 'oru', name: 'Oru Bellwright', role: 'Bell Telegraphist', kind: 'bell', color: '#fbbf24', realm: 'daily', quote: 'Every message has a pitch. Listen for it.' },
  { id: 'brann', name: 'Brann Ember-Cook', role: 'Keeper of the Hearth', kind: 'ladle', color: '#ffb347', realm: 'kitchen', quote: 'Eat until your bowl dims. That is the recipe.' },
  { id: 'pip', name: 'Pip of the Pools', role: 'Apprentice, age nine', kind: 'book', color: '#3ff2d0', realm: 'knowledge', quote: 'I borrowed three flames this week!' },
  { id: 'tolu', name: 'Tolu Stallmaker', role: 'Open-Stall Merchant', kind: 'scroll', color: '#fb7185', realm: 'trade', quote: 'Pay me with a story. I trade in those.' },
  { id: 'vey', name: 'Vey Longwick', role: 'Lamplighter & Wickbearer', kind: 'pole', color: '#5eead4', realm: 'governance', quote: 'Lead for one candle. Then pass the light.' },
  { id: 'ysa', name: 'Ysa the Mender', role: 'Reef Healer', kind: 'glass', color: '#86efac', realm: 'care', quote: 'Sit with them. That is most of the cure.' },
  { id: 'mara', name: 'Mara Tidewise', role: 'Tide Referee', kind: 'oar', color: '#ff7a8a', realm: 'gaming', quote: 'The sea always plays fair. We try to.' },
  { id: 'ino', name: 'Ino Glasshand', role: 'Dreamweaver', kind: 'glass', color: '#a78bfa', realm: 'cinema', quote: 'Close your eyes. We will dream the rest together.' },
  { id: 'kesh', name: 'Kesh the Quiet', role: 'Storyholder', kind: 'book', color: '#f9a8d4', realm: 'festival', quote: 'Nothing is forgotten. It only waits in wax.' },
]
export const peopleById = Object.fromEntries(people.map((p) => [p.id, p]))

export const sectorById = Object.fromEntries(departments.map((d) => [d.id, d]))
