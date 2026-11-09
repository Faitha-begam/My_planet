import { useState } from 'react'
import Scene from '../Scene'

// ---------- Movie posters (used on the Cinema Realm's poster wall) ----------
const motifs = [
  (a) => <><circle cx="50" cy="55" r="28" fill={a} opacity=".25" /><path d="M30 78q20-40 40 0z" fill={a} /><circle cx="42" cy="70" r="2" fill="#050a24" /></>,
  (a) => [30, 50, 70].map((y) => <path key={y} d={`M0 ${y}q25-18 50 0t50 0`} stroke={a} strokeWidth="3" fill="none" />),
  (a) => <><ellipse cx="50" cy="80" rx="40" ry="20" fill={a} opacity=".8" /><circle cx="36" cy="46" r="10" fill="#ffe3b0" /></>,
  (a) => Array.from({ length: 24 }, (_, i) => <circle key={i} cx={14 + (i % 6) * 14} cy={26 + Math.floor(i / 6) * 14} r="2.500" fill={a} className="tw" style={{ animationDelay: `${i * 0.1}s` }} />),
]

export const Poster = ({ f, i, className = '' }) => {
  const w = f.t.split(' ')
  const mid = Math.ceil(w.length / 2)
  return (
    <svg viewBox="0 0 100 150" className={className} aria-hidden="true">
      <defs><linearGradient id={`pg${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={f.b} /><stop offset="1" stopColor="#050a24" /></linearGradient></defs>
      <rect width="100" height="150" rx="6" fill={`url(#pg${i})`} stroke={f.a} strokeOpacity=".5" />
      {motifs[i](f.a)}
      {[w.slice(0, mid).join(' '), w.slice(mid).join(' ')].map((line, k) => (
        <text key={k} x="50" y={122 + k * 11} textAnchor="middle" fill="#ffe3b0" fontSize="9" fontWeight="800" fontFamily="Syne, sans-serif">{line}</text>
      ))}
    </svg>
  )
}

// ---------- The Cloud Kitchens ----------
const dishes = [
  { n: 'Cloud Pancakes', c: '#f9a8d4', inside: ['sky-wheat flour', 'a spoonful of cloud', 'berry syrup'], tag: 'Fluffy! They float a little.', where: 'Breakfast at the Big Table' },
  { n: 'Rainbow Soup', c: '#3ff2d0', inside: ['seven kinds of veggies', 'warm broth', 'a pinch of giggles'], tag: 'Each spoonful is a new colour.', where: 'Lunch at the market stalls' },
  { n: 'Bubble Berries', c: '#a78bfa', inside: ['glow-berries', 'sugar frost'], tag: 'They go pop on your tongue.', where: 'A snack in the Glow Gardens' },
  { n: 'Moon-Cheese Toast', c: '#ffb347', inside: ['bread', 'moon cheese', 'a drizzle of honey'], tag: 'Gooey and glowy.', where: 'Supper in a treetop kitchen' },
]
const dishArt = [
  (c) => <><ellipse cx="50" cy="62" rx="40" ry="10" fill="#16206a" />{[0, 1, 2].map((k) => <ellipse key={k} cx="50" cy={56 - k * 7} rx="26" ry="6" fill={c} opacity={0.95 - k * 0.1} />)}</>,
  (c) => <><path d="M14 52h72a36 30 0 0 1-72 0z" fill="#16206a" /><ellipse cx="50" cy="52" rx="36" ry="7" fill={c} />{['#fb7185', '#fbbf24', '#86efac'].map((x, k) => <circle key={x} cx={36 + k * 14} cy="52" r="3.500" fill={x} />)}</>,
  (c) => <><ellipse cx="50" cy="66" rx="42" ry="10" fill="#16206a" />{[[34, 52], [50, 46], [66, 52], [42, 60], [58, 60]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="9" fill={c} className="fl" style={{ animationDelay: `${k * 0.3}s` }} />)}</>,
  (c) => <><ellipse cx="50" cy="66" rx="42" ry="10" fill="#16206a" /><path d="M20 62l30-34 30 34z" fill="#e8c27a" /><path d="M30 58l20-22 20 22z" fill={c} /></>,
]

export const Menu = () => {
  const [i, setI] = useState(0)
  const d = dishes[i]
  return (
    <div className="space-y-6">
      <div className="grid items-center gap-4 rounded-2xl border border-white/10 bg-amber-400/5 p-6 sm:grid-cols-2">
        <svg viewBox="0 0 100 100" className="mx-auto w-48 sm:w-60" aria-hidden="true"><circle cx="50" cy="50" r="46" fill={d.c} opacity=".12" className="tw" />{dishArt[i](d.c)}</svg>
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-extrabold" style={{ color: d.c }}>{d.n}</h3>
          <p className="mt-1 font-lore text-xl italic text-mist">{d.tag}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-mist/60">What’s inside?</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">{d.inside.map((x) => <span key={x} className="rounded-full border px-3 py-1 text-sm" style={{ borderColor: d.c }}>{x}</span>)}</div>
          <p className="mt-3 text-sm text-white/70">Eaten at: {d.where}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
            {dishes.map((x, k) => <button key={x.n} type="button" onClick={() => setI(k)} aria-pressed={k === i} className={`rounded-full border px-3 py-1 text-xs ${k === i ? 'bg-white/15 text-white' : 'text-mist/70 hover:text-white'}`} style={{ borderColor: x.c }}>{x.n}</button>)}
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[['food', 'The market stalls', '#ffb347'], ['family', 'The Big Table', '#fda4af'], ['housing', 'Treetop kitchens', '#c4b5fd']].map(([s, t, c]) => (
          <figure key={s} className="overflow-hidden rounded-2xl border border-white/10"><Scene id={s} color={c} className="h-32 w-full" /><figcaption className="bg-deep/60 p-2 text-center font-lore text-base italic">{t}</figcaption></figure>
        ))}
      </div>
    </div>
  )
}
