import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Scene from '../components/Scene'
import { locations } from '../data/world'
import { useLocalStorage } from '../hooks/useLocalStorage'

const types = ['All', ...new Set(locations.map((l) => l.type))]

const Explore = () => {
  const [sel, setSel] = useState(null)
  const [type, setType] = useState('All')
  const [stamps] = useLocalStorage('thalune:stamps', [])
  const card = useRef(null)
  const cur = locations.find((l) => l.id === sel)
  useEffect(() => { if (sel) card.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [sel])
  const surprise = () => setSel(locations[Math.floor(Math.random() * locations.length)].id)

  return (
    <>
    <PageHeader crumbs={[['Thalune', '/'], ['Chapter 2 · The World']]} eyebrow="Chapter 2 · The World" title="The map of Thalune"
      plain="Thalune is an ocean of fog with ten places floating in it: cities, arenas, forests, resorts and one dark secret. Tap a glowing place, then enter it." does={['Filter by kind of place', 'Enter any destination', 'Collect passport stamps']} />
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-8">
      <p className="font-lore text-lg italic text-mist">Passport: {stamps.length} of {locations.length} stamps</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {types.map((t) => (
          <button key={t} type="button" onClick={() => setType(t)} aria-pressed={t === type}
            className={`rounded-full border px-4 py-1.5 text-xs transition ${t === type ? 'border-wick bg-wick/20 text-white' : 'border-white/20 text-mist/70 hover:text-white'}`}>{t}</button>
        ))}
        <button type="button" onClick={surprise} className="rounded-full border border-phos/60 px-4 py-1.5 text-xs text-phos hover:bg-phos/10">Surprise me</button>
      </div>

      <div className="relative mt-4 aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/10 bg-deep/40 sm:aspect-[16/9]">
        {['THE VIOLET REACHES', 'THE WESTERN DRIFT', 'THE TEAL DEEP', 'THE AMBER STRANDS'].map((r, i) => (
          <span key={r} className="pointer-events-none absolute text-[clamp(1rem,3vw,2.2rem)] font-extrabold tracking-[0.3em] text-white/[0.04]" style={{ left: `${[62, 4, 52, 62][i]}%`, top: `${[4, 48, 92, 76][i]}%` }}>{r}</span>
        ))}
        {locations.map((l) => (
          <span key={`g${l.id}`} className="pointer-events-none absolute aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ left: `${l.x}%`, top: `${l.y}%`, background: l.color, opacity: 0.16 }} />
        ))}
        {locations.map((l) => {
          const dim = type !== 'All' && l.type !== type
          const on = l.id === sel
          return (
            <button key={l.id} type="button" onClick={() => setSel(l.id)} aria-label={`${l.name}, ${l.type}`} aria-pressed={on}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 transition ${dim ? 'opacity-20' : ''}`} style={{ left: `${l.x}%`, top: `${l.y}%` }}>
              <span className={`fl block size-5 rounded-full transition group-hover:scale-150 ${on ? 'scale-150 ring-2 ring-white' : ''}`}
                style={{ background: l.color, boxShadow: `0 0 ${on ? 40 : 20}px ${l.color}` }} />
              <span className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-lore text-xs italic text-mist sm:text-sm ${on ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>{l.name}</span>
            </button>
          )
        })}
      </div>

      <div ref={card} className="mt-4 min-h-40">
        {cur ? (
          <article key={cur.id} className="grid animate-[page-in_.5s_ease-out] overflow-hidden rounded-3xl border bg-deep/60 sm:grid-cols-2" style={{ borderColor: `${cur.color}66` }}>
            <Scene id={cur.scene} color={cur.color} className="h-52 w-full sm:h-full" />
            <div className="flex flex-col justify-center gap-3 p-6">
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: cur.color }}>{cur.type} · {cur.region}</p>
              <h2 className="text-3xl font-extrabold">{cur.name}</h2>
              <p className="font-lore text-xl italic text-mist">{cur.mood}</p>
              <Link to={`/world/${cur.id}`} className="mt-2 w-fit rounded-full border px-6 py-2 text-sm font-bold hover:bg-white/10" style={{ borderColor: cur.color, color: cur.color }}>Enter {cur.name} →</Link>
            </div>
          </article>
        ) : (
          <p className="pt-8 text-center font-lore text-xl italic text-mist/60">Tap a glowing place on the sea.</p>
        )}
      </div>
    </main>
    </>
  )
}

export default Explore
