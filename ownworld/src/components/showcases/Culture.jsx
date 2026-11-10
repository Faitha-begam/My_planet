import { useEffect, useState } from 'react'
import { films } from '../../data/content'
import { useLocalStorage } from '../../hooks/useLocalStorage'

// ---------- Cinema ----------
const motifs = [
  (a) => <><circle cx="50" cy="55" r="30" fill={a} opacity=".25" /><rect x="43" y="40" width="14" height="22" rx="5" fill={a} /></>,
  (a) => [30, 50, 70].map((y) => <path key={y} d={`M0 ${y}q25-18 50 0t50 0`} stroke={a} strokeWidth="3" fill="none" />),
  (a) => <><ellipse cx="46" cy="58" rx="26" ry="12" fill={a} /><path d="M70 58l16-12v24z" fill={a} /><circle cx="36" cy="55" r="2.5" fill="#050a24" /></>,
  (a) => Array.from({ length: 24 }, (_, i) => <circle key={i} cx={14 + (i % 6) * 14} cy={26 + Math.floor(i / 6) * 14} r="2.5" fill={a} className="tw" style={{ animationDelay: `${i * 0.1}s` }} />),
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

export const PosterShelf = () => {
  const [i, setI] = useState(0)
  const f = films[i]
  return (
    <div className="grid gap-6 rounded-2xl border border-white/10 bg-violet-500/5 p-6 sm:grid-cols-[auto_1fr]">
      <div className="relative mx-auto w-56">
        <div className="absolute -inset-6 -z-10 rounded-full blur-3xl" style={{ background: f.a, opacity: 0.25 }} />
        <Poster f={f} i={i} className="w-full drop-shadow-2xl transition" />
      </div>
      <div className="flex flex-col justify-center gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-violet-300">Now showing</p>
        <h3 className="text-3xl font-extrabold">{f.t}</h3>
        <p className="font-lore text-xl italic text-mist">{f.tag}</p>
        <div className="flex gap-3">
          {films.map((x, k) => (
            <button key={x.t} type="button" onClick={() => setI(k)} aria-label={`Show ${x.t}`} aria-pressed={k === i}
              className={`w-14 overflow-hidden rounded-md border transition ${k === i ? 'scale-110 border-white' : 'border-white/20 opacity-60 hover:opacity-100'}`}>
              <Poster f={x} i={k} className="w-full" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const fan = [
  'group-hover:-translate-x-[170%] group-hover:-rotate-[14deg]', 'group-hover:-translate-x-[90%] group-hover:-rotate-[5deg]',
  'group-hover:-translate-x-[10%] group-hover:rotate-[5deg]', 'group-hover:translate-x-[70%] group-hover:rotate-[14deg]',
]

export const PosterFan = () => (
  <div className="group relative mx-auto h-56 w-full max-w-xs">
    {films.map((f, i) => (
      <Poster key={f.t} f={f} i={i} className={`absolute bottom-0 left-1/2 w-28 origin-bottom -translate-x-1/2 drop-shadow-xl transition duration-500 ${fan[i]}`} />
    ))}
  </div>
)

// ---------- Food ----------
const dishes = [
  { n: 'Glowfin Broth', p: 3, c: '#ffb347', tags: ['smoky', 'served in a lantern'] },
  { n: 'Kelp-Honey Tart', p: 2, c: '#fb7185', tags: ['sweet', 'still warm'] },
  { n: 'Ember Eel', p: 5, c: '#3ff2d0', tags: ['charred', 'sings when cut'] },
  { n: 'Moonsalt Pearls', p: 4, c: '#cfd8ff', tags: ['cold', 'dissolves slowly'] },
]
const dishArt = [
  (c) => <><path d="M14 52h72a36 30 0 0 1-72 0z" fill="#16206a" /><ellipse cx="50" cy="52" rx="36" ry="7" fill={c} /><circle cx="40" cy="52" r="2.5" fill="#fff" className="tw" /></>,
  (c) => <><ellipse cx="50" cy="62" rx="40" ry="10" fill="#16206a" /><circle cx="50" cy="52" r="26" fill={c} opacity=".85" />{[0, 1, 2, 3].map((k) => <line key={k} x1="50" y1="52" x2={50 + 26 * Math.cos(k * 1.57 + 0.4)} y2={52 + 26 * Math.sin(k * 1.57 + 0.4)} stroke="#050a24" strokeWidth="2" />)}</>,
  (c) => <><ellipse cx="50" cy="66" rx="42" ry="10" fill="#16206a" /><path d="M14 56q14-26 28 0t28 0t16-8" stroke={c} strokeWidth="9" fill="none" strokeLinecap="round" className="fl" /></>,
  (c) => <><ellipse cx="50" cy="66" rx="42" ry="10" fill="#16206a" />{[[34, 52], [50, 46], [66, 52], [42, 60], [58, 60]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="9" fill={c} className="fl" style={{ animationDelay: `${k * 0.3}s` }} />)}</>,
]

export const Menu = ({ auto }) => {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setI((x) => (x + 1) % dishes.length), 2600)
    return () => clearInterval(t)
  }, [auto])
  const d = dishes[i]
  return (
    <div className={`grid items-center gap-4 ${auto ? '' : 'rounded-2xl border border-white/10 bg-amber-400/5 p-6 sm:grid-cols-2'}`}>
      <svg viewBox="0 0 100 100" className="mx-auto w-48 sm:w-60" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill={d.c} opacity=".12" className="tw" />
        {[26, 50, 74].map((x, k) => <path key={x} className="fl" style={{ animationDelay: `${k * 0.6}s` }} d={`M${x} 34q-5-8 0-16`} stroke="#cfd8ff" fill="none" opacity=".4" />)}
        {dishArt[i](d.c)}
      </svg>
      <div className="text-center sm:text-left">
        <h3 className="text-2xl font-extrabold" style={{ color: d.c }}>{d.n}</h3>
        <p className="mt-1 font-lore text-lg italic text-mist">{d.tags.join(' · ')}</p>
        <p className="mt-1 text-sm text-white/60">{'◉'.repeat(d.p)} {d.p} lumen-beads</p>
        {!auto && (
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
            {dishes.map((x, k) => (
              <button key={x.n} type="button" onClick={() => setI(k)} aria-pressed={k === i}
                className={`rounded-full border px-3 py-1 text-xs transition ${k === i ? 'bg-white/15 text-white' : 'text-mist/70 hover:text-white'}`} style={{ borderColor: x.c }}>
                {x.n}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ---------- Education ----------
export const Wicks = ({ compact }) => {
  const [lit, setLit] = useState([4])
  const touch = (i) => setLit((l) => (l.includes(i) || !(l.includes(i - 1) || l.includes(i + 1)) ? l : [...l, i]))
  const done = lit.length === 9
  return (
    <div className="rounded-2xl border border-white/10 bg-teal-300/5 p-5 text-center">
      <div className="flex justify-center gap-1.5 sm:gap-3">
        {Array.from({ length: 9 }, (_, i) => (
          <button key={i} type="button" onClick={() => touch(i)} aria-label={lit.includes(i) ? 'Lit wick' : 'Borrow a flame'}
            className="group flex w-7 flex-col items-center sm:w-9">
            <span className={`h-6 w-3 rounded-full transition duration-700 ${lit.includes(i) ? 'bg-teal-200' : 'bg-white/10 group-hover:bg-white/25'}`}
              style={lit.includes(i) ? { boxShadow: '0 0 22px 6px #3ff2d088' } : undefined} />
            <span className="mt-1 h-10 w-2 rounded-b bg-indigo-900" />
          </button>
        ))}
      </div>
      <p className="mt-3 font-lore text-lg italic text-teal-100">
        {done ? 'Everyone is lit. Graduation.' : compact ? 'Borrow a flame from a neighbour.' : 'One student starts lit. Tap a neighbour to borrow a flame, until the whole school glows.'}
      </p>
      {lit.length > 1 && <button type="button" onClick={() => setLit([4])} className="mt-2 text-xs uppercase tracking-widest text-mist/60 hover:text-white">Begin again</button>}
    </div>
  )
}

// ---------- Law ----------
const laws = ['Never take a stranger’s last light', 'Feed every fire', 'Speak softly in the dark', 'Return every lamp lit', 'Mend what you borrow', 'No door closes on a flame', 'Share the first bowl', 'Forgive the dimmed', 'Leave the sea bright']

export const Tablets = () => {
  const [tenth, setTenth] = useLocalStorage('thalune:tenth', '')
  const [draft, setDraft] = useState('')
  return (
    <div className="rounded-2xl border border-white/10 bg-teal-300/5 p-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {laws.map((l, i) => (
          <div key={l} className="group relative rounded-xl border border-white/20 bg-indigo-950 p-3 text-center text-sm transition hover:blur-[1px]" style={{ transform: `rotate(${(i % 3 - 1) * 1.5}deg)` }}>
            <p className="text-xs text-teal-200/60">{['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][i]}</p>
            <p className="mt-1 font-lore text-base italic">{l}</p>
          </div>
        ))}
        <div className="rounded-xl border border-dashed border-teal-300/70 p-3 text-center text-sm">
          <p className="text-xs text-teal-200/60">X</p>
          <p className="mt-1 font-lore text-base italic text-teal-100">{tenth || 'Blank. Yours to write.'}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <input value={draft} maxLength={40} onChange={(e) => setDraft(e.target.value)} placeholder="Carve the tenth law…"
          className="flex-1 rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm outline-none focus:border-teal-300" />
        <button type="button" disabled={!draft.trim()} onClick={() => { setTenth(draft.trim()); setDraft('') }}
          className="rounded-full border border-teal-300/60 px-5 py-2 text-sm text-teal-200 enabled:hover:bg-white/10 disabled:opacity-40">Carve</button>
      </div>
    </div>
  )
}
