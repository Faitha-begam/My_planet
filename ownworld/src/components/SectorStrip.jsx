import { Link } from 'react-router-dom'
import Scene from './Scene'
import { sectorById } from '../data/story'

const SectorStrip = ({ realm }) => (
  <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-8">
    <h2 className="text-xs uppercase tracking-[0.3em] text-mist/60">Go deeper into this realm</h2>
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {realm.sectors.map((id) => {
        const d = sectorById[id]
        return (
          <Link key={id} to={`/sector/${id}`} className="group overflow-hidden rounded-2xl border bg-deep/50 transition hover:-translate-y-1" style={{ borderColor: `${d.color}55` }}>
            <Scene id={d.scene} color={d.color} className="h-36 w-full transition duration-500 group-hover:scale-110" />
            <div className="p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.25em]" style={{ color: d.color }}>{d.label}</p>
              <p className="mt-1 font-lore text-lg italic text-mist">{d.line}</p>
              <p className="mt-2 text-xs text-white/60">Enter {d.name} →</p>
            </div>
          </Link>
        )
      })}
    </div>
  </section>
)

export default SectorStrip
