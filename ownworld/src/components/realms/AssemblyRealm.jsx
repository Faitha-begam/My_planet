import Character from '../Character'
import { Choices } from '../showcases/Systems'
import { Tablets } from '../showcases/Culture'
import { GovernmentShow } from '../showcases/Rule'
import { sectorById } from '../../data/story'

// The Assembly: twelve boats in a ring that never anchors, around one lamp.
const Ring = () => (
  <div className="relative overflow-hidden rounded-3xl border border-teal-300/30 bg-gradient-to-b from-abyss to-teal-950/40 py-6">
    <svg viewBox="0 0 400 200" className="mx-auto w-full max-w-3xl" aria-hidden="true">
      <ellipse cx="200" cy="100" rx="160" ry="62" fill="none" stroke="#5eead4" opacity=".3" />
      <g className="sp" style={{ animationDuration: '90s' }}>
        {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * 6.283; return <path key={i} d={`M${200 + 160 * Math.cos(a) - 9} ${100 + 62 * Math.sin(a)}q9 12 18 0z`} fill="#cfd8ff" /> })}
      </g>
      <circle cx="200" cy="100" r="22" fill="#5eead4" opacity=".25" className="tw" /><circle cx="200" cy="100" r="9" fill="#ffe3b0" className="tw" />
    </svg>
    <div className="absolute inset-x-0 bottom-0 flex justify-center gap-10">
      <Character kind="pole" color="#5eead4" className="h-28 sm:h-36" /><Character kind="scroll" color="#7dd3fc" className="h-28 sm:h-36" /><Character kind="lamp" color="#fbbf24" className="h-28 sm:h-36" />
    </div>
  </div>
)

const AssemblyRealm = () => (
  <div className="space-y-8">
    <Ring />
    <div><h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">The Assembly · you decide who leads</h2><GovernmentShow /></div>
    <div><h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">The Salt Court · justice by repair</h2><Tablets /></div>
    <div><h2 className="mb-1 text-xs uppercase tracking-[0.3em] text-mist/60">The Watch Lamps · emergencies</h2><Choices d={sectorById.safety} /></div>
  </div>
)

export default AssemblyRealm
