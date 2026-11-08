import { useState } from 'react'
import { VoteBooth } from './Civic'

const people = [['Ember Oru', 'Bellwright', '#7dd3fc'], ['Sael of the Pools', 'Healer', '#86efac'], ['Vey Longwick', 'Lamplighter', '#ffb347'], ['Mara Tidewise', 'Tide Reader', '#a78bfa'], ['Ino Glasshand', 'Glasswright', '#f9a8d4'], ['Kesh the Quiet', 'Storyholder', '#5eead4']]
const start = () => Object.fromEntries(people.map((p, i) => [p[0], 20 + ((i * 17) % 35)]))

// Government: nobody is elected. You lend wicks; the brightest lead; glow fades each tide.
export const LentLight = () => {
  const [glow, setGlow] = useState(start)
  const [lent, setLent] = useState({})
  const [tide, setTide] = useState(1)
  const used = Object.values(lent).reduce((a, b) => a + b, 0)
  const shown = (n) => glow[n] + (lent[n] || 0) * 30
  const ranked = [...people].sort((a, b) => shown(b[0]) - shown(a[0]))
  const council = ranked.slice(0, 3).map((p) => p[0])
  const lend = (n) => { if (used < 3) setLent((l) => ({ ...l, [n]: (l[n] || 0) + 1 })) }
  const take = (n) => setLent((l) => ({ ...l, [n]: Math.max(0, (l[n] || 0) - 1) }))
  const pass = () => {
    setGlow(() => Object.fromEntries(people.map((p) => [p[0], Math.round(shown(p[0]) * 0.55)])))
    setLent({}); setTide((t) => t + 1)
  }
  const max = Math.max(...people.map((p) => shown(p[0])), 60)
  return (
    <div className="rounded-2xl border border-sky-300/30 bg-sky-300/5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-lore text-xl italic text-sky-100">Tide {tide}: lend your {3 - used} wick{3 - used === 1 ? '' : 's'} to whoever you trust.</p>
        <button type="button" onClick={pass} className="rounded-full border border-sky-300 px-5 py-2 text-sm text-sky-200 hover:bg-white/10">Let the tide pass</button>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {people.map(([n, role, c]) => {
          const lead = council.includes(n)
          return (
            <div key={n} className="flex flex-col items-center gap-2 rounded-xl border p-3 text-center" style={{ borderColor: lead ? c : '#ffffff1a', background: lead ? `${c}14` : 'transparent' }}>
              <div className="flex h-24 items-end"><div className="w-8 rounded-t-full transition-all duration-700" style={{ height: `${(shown(n) / max) * 100}%`, background: `linear-gradient(${c},transparent)`, boxShadow: lead ? `0 0 24px ${c}` : 'none' }} /></div>
              <p className="text-sm font-bold leading-tight">{n}</p>
              <p className="font-lore text-sm italic text-mist">{lead ? 'Wickbearer' : role}</p>
              <div className="flex gap-1">
                <button type="button" onClick={() => lend(n)} disabled={used >= 3} className="rounded-full border border-white/30 px-3 text-sm disabled:opacity-30 enabled:hover:bg-white/10" aria-label={`Lend a wick to ${n}`}>+</button>
                <button type="button" onClick={() => take(n)} disabled={!lent[n]} className="rounded-full border border-white/30 px-3 text-sm disabled:opacity-30 enabled:hover:bg-white/10" aria-label={`Take a wick back from ${n}`}>−</button>
              </div>
            </div>
          )
        })}
      </div>
      <p className="mt-4 font-lore text-lg italic text-mist">The three brightest lead. When the tide passes, every glow fades by almost half. Power never lasts.</p>
    </div>
  )
}

export const GovernmentShow = () => (
  <div className="space-y-6">
    <LentLight />
    <div>
      <h3 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">A decision of the Assembly</h3>
      <VoteBooth />
    </div>
  </div>
)
