// Shared showcase content (kept apart from components so fast-refresh stays happy).
export const films = [
  { t: 'The Last Wick', tag: 'One flame. One long dark.', a: '#ffb347', b: '#7c2d12' },
  { t: 'Undertow Lullaby', tag: 'The sea hums back.', a: '#a78bfa', b: '#1e1b4b' },
  { t: 'Glassfin', tag: 'She swims through light.', a: '#3ff2d0', b: '#134e4a' },
  { t: 'A Thousand Quiet Hours', tag: 'Nothing happens. Everything changes.', a: '#ff7a8a', b: '#4c0519' },
]

export const stages = [
  { n: 'Murmur Pools', age: '0–6', scene: 'society', c: '#7dd3fc', does: ['splash', 'listen', 'hum'] },
  { n: 'Tinkering Tides', age: '7–12', scene: 'economy-tech', c: '#93c5fd', does: ['take apart', 'rebuild', 'break again'] },
  { n: 'Borrowed Flame', age: '13–17', scene: 'education', c: '#3ff2d0', does: ['pick a flame', 'follow it', 'swap flames'] },
  { n: 'The Wander Year', age: '18', scene: 'tourism', c: '#fdba74', does: ['sail alone', 'get lost', 'come back changed'] },
  { n: 'Lamplight Trial', age: 'any age', scene: 'festivals', c: '#f9a8d4', does: ['make something', 'light a stranger', 'no marks'] },
  { n: 'Return & Teach', age: 'for life', scene: 'hospitality', c: '#fbbf24', does: ['open a window', 'lend a flame', 'be borrowed'] },
]
