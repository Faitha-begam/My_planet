import { useState } from 'react'
import { Link } from 'react-router-dom'
import Panorama from '../Panorama'
import Scene from '../Scene'
import Showcase from '../Showcase'
import { HowItWorks, Choices } from '../showcases/Systems'
import { sectorById } from '../../data/story'

const spots = [[16, 56], [46, 36], [76, 58], [32, 26]]

// An open landscape. Each glowing place is one part of the realm: tap it to step inside.
const PanoramaRealm = ({ realm }) => {
  const [sel, setSel] = useState(realm.sectors[0])
  const d = sectorById[sel]
  return (
    <div className="space-y-6">
      <Panorama color={realm.color} seed={realm.seed}>
        {realm.sectors.map((id, i) => {
          const s = sectorById[id]
          return (
            <button key={id} type="button" onClick={() => setSel(id)} aria-pressed={id === sel} aria-label={s.label}
              className="group absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${spots[i][0]}%`, top: `${spots[i][1]}%` }}>
              <span className={`fl mx-auto block size-20 overflow-hidden rounded-full border-2 transition group-hover:scale-110 sm:size-24 ${id === sel ? 'scale-110' : ''}`} style={{ borderColor: s.color, boxShadow: `0 0 ${id === sel ? 50 : 22}px ${s.color}` }}>
                <Scene id={s.scene} color={s.color} className="h-full w-full" />
              </span>
              <span className="mt-1 block text-xs font-extrabold uppercase tracking-wider" style={{ color: s.color }}>{s.label}</span>
            </button>
          )
        })}
        <p className="absolute bottom-3 left-4 font-lore text-sm italic text-mist/70">Tap a glowing place to step inside</p>
      </Panorama>
      <article key={sel} className="animate-[rise-in_.5s_ease-out] rounded-3xl border bg-deep/50 p-5" style={{ borderColor: `${d.color}55` }}>
        <div className="grid gap-5 md:grid-cols-[18rem_1fr]">
          <Scene id={d.scene} color={d.color} className="h-48 w-full rounded-2xl" />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: d.color }}>{d.label}</p>
            <h2 className="text-3xl font-extrabold">{d.name}</h2>
            <p className="font-lore text-xl italic text-mist">{d.line}</p>
            <Link to={`/sector/${d.id}`} className="mt-3 inline-block rounded-full border px-5 py-2 text-sm hover:bg-white/10" style={{ borderColor: d.color, color: d.color }}>Enter {d.name} →</Link>
          </div>
        </div>
        <div className="mt-6"><Showcase d={d} /></div>
        <HowItWorks d={d} />
        <Choices d={d} />
      </article>
    </div>
  )
}

export default PanoramaRealm
