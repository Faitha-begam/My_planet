import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { departments } from '../data/world'

const n = departments.length
const pos = departments.map((_, i) => { const a = (i / n) * 6.283 - 1.5708; return [200 + 160 * Math.cos(a), 200 + 160 * Math.sin(a)] })
const idx = Object.fromEntries(departments.map((d, i) => [d.id, i]))
const edges = [...new Set(departments.flatMap((d) => d.related.map((r) => [d.id, r].sort().join('|'))))].map((k) => k.split('|'))

// The whole civilization as one connected web. Hover to see who depends on whom.
const CivWeb = () => {
  const nav = useNavigate()
  const [act, setAct] = useState(null)
  const cur = act && departments[idx[act]]
  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-xl" role="group" aria-label="Map of how the sectors connect">
      {edges.map(([a, b]) => {
        const hot = act && (a === act || b === act)
        return <line key={a + b} x1={pos[idx[a]][0]} y1={pos[idx[a]][1]} x2={pos[idx[b]][0]} y2={pos[idx[b]][1]} stroke={hot ? '#ffe3b0' : '#ffffff'} strokeOpacity={hot ? 0.9 : 0.1} strokeWidth={hot ? 1.5 : 0.6} />
      })}
      {departments.map((d, i) => {
        const on = act === d.id
        const linked = act && cur.related.includes(d.id)
        return (
          <g key={d.id} tabIndex={0} role="link" aria-label={d.label} className="cursor-pointer outline-none"
            onMouseEnter={() => setAct(d.id)} onFocus={() => setAct(d.id)}
            onClick={() => (act === d.id ? nav(`/sector/${d.id}`) : setAct(d.id))}
            onKeyDown={(e) => e.key === 'Enter' && nav(`/sector/${d.id}`)}>
            <circle cx={pos[i][0]} cy={pos[i][1]} r="14" fill="transparent" />
            <circle cx={pos[i][0]} cy={pos[i][1]} r={on ? 9 : linked ? 7 : 5} fill={d.color} opacity={act && !on && !linked ? 0.3 : 1} style={{ filter: `drop-shadow(0 0 ${on ? 8 : 3}px ${d.color})`, transition: 'all .3s' }} />
          </g>
        )
      })}
      <text x="200" y="196" textAnchor="middle" fill={cur ? cur.color : '#b9c7ff'} fontSize="11" fontWeight="800" fontFamily="Syne, sans-serif">{cur ? cur.label : 'MIRABLOOM'}</text>
      <text x="200" y="212" textAnchor="middle" fill="#b9c7ff" fontSize="8" fontStyle="italic" fontFamily="Cormorant Garamond, serif" opacity=".8">{cur ? 'tap again to enter' : 'hover a light'}</text>
    </svg>
  )
}

export default CivWeb
