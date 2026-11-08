import { Link } from 'react-router-dom'
import { realmById } from '../data/story'

// Six realms orbit the planet; each moon is a link into that realm.
const moons = [
  { id: 'voyage', inset: 14, d: 40, o: 0 }, { id: 'gaming', inset: 14, d: 40, o: -20 },
  { id: 'cinema', inset: 6, d: 64, o: -10 }, { id: 'kitchen', inset: 6, d: 64, o: -42 },
  { id: 'knowledge', inset: 0, d: 90, o: -30 }, { id: 'governance', inset: 0, d: 90, o: -75 },
]
const cities = [[250, 250], [330, 280], [290, 330], [360, 230], [230, 310], [320, 190], [270, 200], [200, 260]]

const Planet = () => (
  <div className="relative aspect-square w-full">
    <svg viewBox="0 0 600 600" className="absolute inset-0" aria-hidden="true">
      <defs>
        <radialGradient id="pg" cx="35%" cy="30%"><stop offset="0" stopColor="#6b7cff" /><stop offset=".5" stopColor="#1b2a8a" /><stop offset="1" stopColor="#050a24" /></radialGradient>
        <radialGradient id="ph"><stop offset=".86" stopColor="#3ff2d0" stopOpacity="0" /><stop offset="1" stopColor="#3ff2d0" stopOpacity=".4" /></radialGradient>
        <clipPath id="pc"><circle cx="300" cy="300" r="190" /></clipPath>
      </defs>
      <circle cx="300" cy="300" r="222" fill="url(#ph)" />
      <circle cx="300" cy="300" r="190" fill="url(#pg)" />
      <g clipPath="url(#pc)">
        {[[240, 22, '#3ff2d0', 0.32, 40], [300, 30, '#ffb347', 0.22, 55], [360, 18, '#a78bfa', 0.35, 30]].map(([y, h, c, o, d], i) => (
          <ellipse key={i} cx="260" cy={y} rx="330" ry={h} fill={c} opacity={o} style={{ animation: `sway ${d}s ease-in-out infinite alternate` }} />
        ))}
        {cities.map(([x, y], i) => <circle key={i} className="tw" cx={x} cy={y} r="3" fill="#ffe3b0" style={{ animationDelay: `${i * 0.3}s` }} />)}
      </g>
    </svg>
    {moons.map((m) => {
      const r = realmById[m.id]
      const anim = `spin ${m.d}s linear ${m.o}s infinite`
      return (
        <div key={m.id} className="pointer-events-none absolute rounded-full border border-white/10" style={{ inset: `${m.inset}%`, animation: anim }}>
          <Link to={`/realms/${m.id}`} aria-label={`Enter ${r.name}`} className="group pointer-events-auto absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <span className="flex flex-col items-center" style={{ animation: `${anim} reverse` }}>
              <span className="size-5 rounded-full transition group-hover:scale-150" style={{ background: r.color, boxShadow: `0 0 18px ${r.color}` }} />
              <span className="mt-1 whitespace-nowrap font-lore text-xs italic text-mist opacity-80 group-hover:opacity-100">{r.short}</span>
            </span>
          </Link>
        </div>
      )
    })}
  </div>
)

export default Planet
