import { useEffect, useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import Scene from '../Scene'

// ---------- Politics ----------
const leaders = [['Grandma Hattie', 'Big Hat wearer this month'], ['Little Bo', 'Big Hat wearer last month'], ['Uncle Tumble', 'Next in line, maybe!']]

export const VoteBooth = ({ compact }) => {
  const [mine, setMine] = useLocalStorage('mirabloom:vote', null)
  const y = 412 + (mine === 'yes' ? 1 : 0)
  const n = 388 + (mine === 'no' ? 1 : 0)
  const pct = Math.round((y / (y + n)) * 100)
  return (
    <div className={compact ? '' : 'rounded-2xl border border-white/10 bg-sky-300/5 p-6'}>
      <p className="font-lore text-xl italic text-sky-100">Pancakes or waffles at the Big Picnic?</p>
      <div className="mt-3 flex h-4 overflow-hidden rounded-full bg-white/10" role="img" aria-label={`${pct}% yes`}>
        <div className="bg-sky-300 transition-all duration-700" style={{ width: `${pct}%` }} />
        <div className="bg-rose-300 transition-all duration-700" style={{ width: `${100 - pct}%` }} />
      </div>
      <p className="mt-1 flex justify-between text-xs text-mist/70"><span>Pancakes {y}</span><span>Waffles {n}</span></p>
      <div className="mt-3 flex gap-2">
        {mine ? (
          <button type="button" onClick={() => setMine(null)} className="rounded-full border border-white/30 px-4 py-1.5 text-xs hover:bg-white/10">You picked {mine === 'yes' ? 'pancakes' : 'waffles'} · change</button>
        ) : (<>
          <button type="button" onClick={() => setMine('yes')} className="rounded-full border border-sky-300 px-4 py-1.5 text-xs text-sky-200 hover:bg-sky-300/20">Pancakes!</button>
          <button type="button" onClick={() => setMine('no')} className="rounded-full border border-rose-300 px-4 py-1.5 text-xs text-rose-200 hover:bg-rose-300/20">Waffles!</button>
        </>)}
      </div>
      {!compact && (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {leaders.map(([name, cur], i) => (
            <div key={name} className="flex items-center gap-3 rounded-xl border border-white/10 p-3">
              <svg viewBox="0 0 40 40" className="size-12 shrink-0" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#16206a" /><circle cx="20" cy="16" r="7" fill="#cfd8ff" /><path d="M7 36q13-18 26 0z" fill={['#7dd3fc', '#ffb347', '#a78bfa'][i]} /></svg>
              <div><p className="text-sm font-bold">{name}</p><p className="font-lore text-sm italic text-mist">{cur}</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------- Daily life ----------
const hours = [['Wake-Up Hour', 'Yawn, stretch, say good morning'], ['Play Hour', 'Everybody runs outside'], ['Snack Hour', 'Time for something yummy'], ['Make Hour', 'Build, paint and fix things'], ['Friend Hour', 'Visit a friend'], ['Story Hour', 'Grandmas tell stories'], ['Sleep Hour', 'Cosy beds, quiet night']]
const pt = (a, r) => [100 + r * Math.cos(a), 100 + r * Math.sin(a)]
const sector = (i) => {
  const a0 = (i / 7) * 6.283 - 1.5708, a1 = ((i + 1) / 7) * 6.283 - 1.5708
  const [x0, y0] = pt(a0, 90), [x1, y1] = pt(a1, 90)
  return `M100 100L${x0} ${y0}A90 90 0 0 1 ${x1} ${y1}Z`
}
const nowIndex = () => { const d = new Date(); return ((d.getHours() * 60 + d.getMinutes()) / 1440) * 7 }

export const Clock = ({ compact }) => {
  const [pos, setPos] = useState(nowIndex)
  const [pick, setPick] = useState(null)
  useEffect(() => { const t = setInterval(() => setPos(nowIndex()), 30000); return () => clearInterval(t) }, [])
  const cur = Math.floor(pos)
  const shown = pick ?? cur
  const hand = pt((pos / 7) * 6.283 - 1.5708, 78)
  return (
    <div className="grid place-items-center gap-3 text-center">
      <svg viewBox="0 0 200 200" className={compact ? 'w-40' : 'w-64'} role="img" aria-label="The Seven Happy Hours clock">
        {hours.map((h, i) => (
          <path key={h[0]} d={sector(i)} onClick={() => setPick(i)} className="cursor-pointer transition hover:opacity-100"
            fill={i === shown ? '#bef264' : i % 2 ? '#16206a' : '#0f1a55'} opacity={i === shown ? 0.85 : 0.9} stroke="#050a24" strokeWidth="2" />
        ))}
        <line x1="100" y1="100" x2={hand[0]} y2={hand[1]} stroke="#ffe3b0" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="100" r="7" fill="#ffb347" />
      </svg>
      <p className="font-lore text-xl italic text-lime-100">{hours[shown][0]}: {hours[shown][1]}{shown === cur ? ' (now)' : ''}</p>
      {!compact && (
        <div className="flex flex-wrap justify-center gap-2">
          {hours.map((h, i) => (
            <button key={h[0]} type="button" onClick={() => setPick(i)} aria-pressed={i === shown}
              className={`rounded-full border px-3 py-1 text-xs ${i === shown ? 'border-lime-300 bg-lime-300/20' : 'border-white/20 text-mist/70 hover:text-white'}`}>{h[0]}</button>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------- Transport ----------
const lines = [
  { n: 'The Sleepy Whale', d: '40 days', c: '#fdba74', p: 'M20 120C70 40 130 150 190 80S270 40 280 50' },
  { n: 'The Speedy Whale', d: '6 days', c: '#7dd3fc', p: 'M20 120C80 110 140 120 200 110S260 90 280 50' },
  { n: 'The Round-and-Round Whale', d: '12 days', c: '#f9a8d4', p: 'M20 120C40 30 120 20 150 70S240 130 280 50' },
]

export const Current = () => {
  const [i, setI] = useState(0)
  const l = lines[i]
  return (
    <div className="rounded-2xl border border-white/10 bg-sky-300/5 p-6">
      <svg viewBox="0 0 300 160" className="w-full" aria-hidden="true">
        {lines.map((x, k) => <path key={x.n} id={`cl${k}`} d={x.p} fill="none" stroke={x.c} strokeWidth={k === i ? 3 : 1} opacity={k === i ? 1 : 0.25} strokeDasharray={k === i ? '6 5' : undefined} />)}
        {[[20, 120], [280, 50]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="6" fill="#ffe3b0" className="tw" />)}
        <g key={i}><path d="M-8 -3h16l-3 6h-10z" fill="#fff" /><animateMotion dur={`${4 + i * 2}s`} repeatCount="indefinite"><mpath href={`#cl${i}`} /></animateMotion></g>
      </svg>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {lines.map((x, k) => (
          <button key={x.n} type="button" onClick={() => setI(k)} aria-pressed={k === i}
            className={`rounded-full border px-4 py-1.5 text-xs ${k === i ? 'bg-white/15' : 'text-mist/70 hover:text-white'}`} style={{ borderColor: x.c }}>{x.n}</button>
        ))}
        <span className="ml-auto font-lore text-lg italic" style={{ color: l.c }}>{l.d} for the whole trip</span>
      </div>
    </div>
  )
}

// ---------- Generic: three moments from a department ----------
export const Frames = ({ d }) => {
  const [k, setK] = useState(0)
  const go = (s) => setK((x) => (x + s + 3) % 3)
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="relative">
        <Scene key={k} id={d.scene} color={d.color} className="h-64 w-full animate-[page-in_.6s_ease-out]" style={{ filter: `hue-rotate(${k * 40}deg)` }} />
        <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss p-5 font-lore text-xl italic text-white">{d.frames[k]}</p>
      </div>
      <div className="flex items-center justify-between bg-deep/60 px-4 py-2">
        <button type="button" onClick={() => go(-1)} className="px-3 text-xl text-mist hover:text-white" aria-label="Previous moment">←</button>
        <span className="flex gap-2">{[0, 1, 2].map((x) => <button key={x} type="button" onClick={() => setK(x)} aria-label={`Moment ${x + 1}`} className={`size-2.5 rounded-full ${x === k ? 'bg-white' : 'bg-white/30'}`} />)}</span>
        <button type="button" onClick={() => go(1)} className="px-3 text-xl text-mist hover:text-white" aria-label="Next moment">→</button>
      </div>
    </div>
  )
}
