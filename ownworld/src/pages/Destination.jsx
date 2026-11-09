import { Link, useParams } from 'react-router-dom'
import { Crumbs } from '../components/PageHeader'
import Scene from '../components/Scene'
import { deptById, locById, locations } from '../data/world'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useScrollY } from '../hooks/useScrollY'
import NotFound from './NotFound'

const Destination = () => {
  const { id } = useParams()
  const l = locById[id]
  const y = useScrollY()
  const [stamps, setStamps] = useLocalStorage('mirabloom:stamps', [])
  if (!l) return <NotFound />
  const stamped = stamps.includes(l.id)
  const dept = deptById[l.dept]
  const near = locations.filter((x) => x.id !== l.id).sort((a, b) => Math.hypot(a.x - l.x, a.y - l.y) - Math.hypot(b.x - l.x, b.y - l.y)).slice(0, 3)

  return (
    <main>
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute left-4 top-20 z-10 sm:left-10"><Crumbs crumbs={[['Mirabloom', '/'], ['The World', '/world'], [l.name]]} /></div>
        <Scene id={l.scene} color={l.color} className="absolute inset-0 h-[120%] w-full" style={{ transform: `translateY(${y * 0.3}px) scale(1.05)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent" />
        {l.sights.map((s, i) => (
          <span key={s} className="fl absolute rounded-full border border-white/30 bg-abyss/60 px-4 py-1.5 font-lore text-sm italic backdrop-blur-sm sm:text-base"
            style={{ left: `${[8, 55, 28][i]}%`, top: `${[28, 40, 55][i]}%`, animationDelay: `${i * 0.8}s` }}>{s}</span>
        ))}
        <div className="absolute bottom-8 left-4 sm:left-10">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: l.color }}>{l.type} · {l.region}</p>
          <h1 className="text-[clamp(2.5rem,9vw,6rem)] font-extrabold leading-none">{l.name}</h1>
          <p className="mt-2 font-lore text-2xl italic text-mist">{l.mood}</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => setStamps((s) => (s.includes(l.id) ? s.filter((x) => x !== l.id) : [...s, l.id]))} aria-pressed={stamped}
            className="rounded-full border px-6 py-2 text-sm font-bold hover:bg-white/10" style={{ borderColor: l.color, color: stamped ? '#050a24' : l.color, background: stamped ? l.color : undefined }}>
            {stamped ? 'Stamped ✓ (tap to remove)' : 'Stamp my passport'}
          </button>
          <Link to={`/sector/${dept.id}`} className="rounded-full border border-white/30 px-6 py-2 text-sm hover:bg-white/10">Meet {dept.name} →</Link>
          <Link to="/world" className="rounded-full border border-white/30 px-6 py-2 text-sm hover:bg-white/10">← Back to the sea</Link>
        </div>
        <h2 className="mt-12 text-xs uppercase tracking-[0.3em] text-mist/60">Nearby</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {near.map((n) => (
            <Link key={n.id} to={`/world/${n.id}`} className="group overflow-hidden rounded-2xl border border-white/10">
              <Scene id={n.scene} color={n.color} className="h-32 w-full transition duration-500 group-hover:scale-110" />
              <p className="bg-deep/70 p-3 text-sm font-bold">{n.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Destination
