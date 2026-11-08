import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { stages } from '../../data/content'
import Scene from '../Scene'


export const LearningJourney = () => {
  const [i, setI] = useState(0)
  const [walk, setWalk] = useState(false)
  useEffect(() => {
    if (!walk) return
    const t = setInterval(() => setI((x) => (x + 1) % stages.length), 2200)
    return () => clearInterval(t)
  }, [walk])
  const s = stages[i]
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="relative">
        <Scene key={i} id={s.scene} color={s.c} className="h-60 w-full animate-[page-in_.6s_ease-out]" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent" />
        <div className="absolute bottom-4 left-5">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: s.c }}>Age {s.age}</p>
          <h3 className="text-3xl font-extrabold">{s.n}</h3>
        </div>
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          {s.does.map((w, k) => <span key={w} className="fl rounded-full border border-white/30 bg-abyss/60 px-3 py-1 font-lore text-sm italic" style={{ animationDelay: `${k * 0.6}s` }}>{w}</span>)}
        </div>
      </div>
      <div className="flex items-center gap-1 overflow-x-auto bg-deep/60 px-4 py-4">
        {stages.map((x, k) => (
          <button key={x.n} type="button" onClick={() => { setWalk(false); setI(k) }} aria-pressed={k === i} aria-label={x.n} className="flex flex-1 flex-col items-center gap-1">
            <span className={`size-4 rounded-full transition ${k === i ? 'scale-150' : k < i ? 'opacity-80' : 'opacity-30'}`} style={{ background: x.c, boxShadow: k === i ? `0 0 16px ${x.c}` : 'none' }} />
            <span className="hidden text-[0.65rem] text-mist/70 sm:block">{x.n}</span>
          </button>
        ))}
        <button type="button" onClick={() => setWalk((w) => !w)} className="ml-3 shrink-0 rounded-full border border-white/30 px-4 py-1 text-xs hover:bg-white/10">{walk ? 'Pause' : 'Walk the road'}</button>
      </div>
    </div>
  )
}

const curiosities = [
  { n: 'Tides', adj: 'Tide', noun: 'Reader', does: 'read the sea’s mood' },
  { n: 'Glass', adj: 'Glass', noun: 'Wright', does: 'shape light into glass' },
  { n: 'Songs', adj: 'Song', noun: 'Keeper', does: 'keep the world’s songs' },
  { n: 'Fog', adj: 'Fog', noun: 'Cutter', does: 'carve paths through the fog' },
  { n: 'Bells', adj: 'Bell', noun: 'Binder', does: 'bind bells to moments' },
  { n: 'Embers', adj: 'Ember', noun: 'Tender', does: 'tend fires and their stories' },
]

// Education connects to careers: two curiosities become a Guild.
export const CuriosityCompass = () => {
  const [picks, setPicks] = useState([])
  const toggle = (n) => setPicks((p) => (p.includes(n) ? p.filter((x) => x !== n) : p.length < 2 ? [...p, n] : [p[1], n]))
  const [a, b] = picks.map((n) => curiosities.find((c) => c.n === n))
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-teal-300/5 p-6">
      <p className="font-lore text-2xl italic">Pick two curiosities. Your road finds a Guild.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {curiosities.map((c) => <button key={c.n} type="button" aria-pressed={picks.includes(c.n)} onClick={() => toggle(c.n)} className={`rounded-full border px-5 py-2 text-sm ${picks.includes(c.n) ? 'border-teal-300 bg-teal-300/20' : 'border-white/20 text-mist hover:text-white'}`}>{c.n}</button>)}
      </div>
      {a && b && (
        <div className="mt-5 animate-[rise-in_.5s_ease-out]">
          <p className="text-3xl font-extrabold text-teal-200">{a.adj} {b.noun}</p>
          <p className="font-lore text-xl italic text-mist">You would {a.does}, and {b.does}.</p>
          <Link to="/sector/work" className="mt-3 inline-block rounded-full border border-teal-300/60 px-5 py-2 text-sm text-teal-200 hover:bg-white/10">See how Guilds work →</Link>
        </div>
      )}
    </div>
  )
}
