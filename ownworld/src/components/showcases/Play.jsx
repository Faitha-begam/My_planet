import { useEffect, useState } from 'react'
import Scene from '../Scene'

// The Cosy Clinics: breathe like a sleepy whale.
export const Breath = () => {
  const [on, setOn] = useState(false)
  const [phase, setPhase] = useState('in')
  useEffect(() => {
    if (!on) return
    const t = setTimeout(() => setPhase((p) => (p === 'in' ? 'out' : 'in')), phase === 'in' ? 4000 : 6000)
    return () => clearTimeout(t)
  }, [on, phase])
  const big = on && phase === 'in'
  return (
    <div className="grid place-items-center gap-4 rounded-2xl border border-white/10 bg-emerald-400/5 p-8">
      <div className="grid size-56 place-items-center">
        <div className="size-40 rounded-full" style={{ background: 'radial-gradient(circle,#fff,#86efac 40%,transparent 70%)', boxShadow: '0 0 60px #86efac88', transform: `scale(${big ? 1.4 : 0.7})`, transition: `transform ${phase === 'in' ? 4 : 6}s ease-in-out` }} />
      </div>
      <p className="text-center font-lore text-2xl italic text-emerald-100">{on ? (phase === 'in' ? 'Breathe in… like a sleepy whale' : 'Breathe out… slowly…') : 'The Cosy Doctor’s trick: breathe in for four, out for six.'}</p>
      <button type="button" onClick={() => { setOn((o) => !o); setPhase('in') }} className="rounded-full border border-emerald-300/60 px-5 py-2 text-sm text-emerald-200 hover:bg-white/10">{on ? 'Rest' : 'Try it'}</button>
    </div>
  )
}

const parties = [
  { n: 'Pillow-Fight Parade', scene: 'festivals', c: '#f9a8d4', line: 'Everyone marches down the street with a pillow. Fluff flies everywhere!' },
  { n: 'Backwards Day', scene: 'society', c: '#fbbf24', line: 'Walk backwards, say goodbye for hello, and eat dessert first!' },
  { n: 'Puddle-Jumping Day', scene: 'recreation', c: '#7dd3fc', line: 'After the rain, everyone jumps in the biggest puddle they can find.' },
  { n: 'Upside-Down Dinner', scene: 'family', c: '#a78bfa', line: 'Once a year, dinner is served on the ceiling. (Well, we pretend!)' },
]
const hats = ['M-9-22h18l-4-9h-10z', 'M-10-22h20l-10-14z', 'M-8-22q8-18 16 0z']
const hatCols = ['#fbbf24', '#fb7185', '#7dd3fc', '#86efac', '#c4b5fd']

// Festivals: pick a party, then make a silly hat for it.
export const PartyDay = () => {
  const [i, setI] = useState(0)
  const [flip, setFlip] = useState(false)
  const [shape, setShape] = useState(0)
  const [col, setCol] = useState(0)
  const p = parties[i]
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-5" style={{ borderColor: `${p.c}55`, background: `${p.c}0d` }}>
        <div className="flex flex-wrap gap-2">
          {parties.map((x, k) => <button key={x.n} type="button" onClick={() => { setI(k); setFlip(false) }} aria-pressed={k === i} className={`rounded-full border px-4 py-1.5 text-sm ${k === i ? 'bg-white/15' : 'text-mist/70 hover:text-white'}`} style={{ borderColor: x.c }}>{x.n}</button>)}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-xl"><Scene id={p.scene} color={p.c} className="h-52 w-full transition duration-700" style={{ transform: flip ? 'rotate(180deg) scaleX(-1)' : 'none' }} /></div>
          <div className="flex flex-col justify-center gap-3"><p className="text-3xl font-extrabold" style={{ color: p.c }}>{p.n}</p><p className="font-lore text-2xl italic">{p.line}</p>
            <button type="button" onClick={() => setFlip((f) => !f)} className="w-fit rounded-full border px-5 py-2 text-sm font-bold hover:bg-white/10" style={{ borderColor: p.c, color: p.c }}>{flip ? 'Put the world back' : 'Turn the world upside down!'}</button></div>
        </div>
      </div>
      <div className="rounded-2xl border border-amber-300/30 bg-amber-300/5 p-5">
        <p className="font-lore text-xl italic">Silly Hat Maker: every party needs a silly hat.</p>
        <div className="mt-3 grid items-center gap-5 sm:grid-cols-[10rem_1fr]">
          <svg viewBox="-20 -42 40 66" className="mx-auto h-40" aria-label="Your silly hat"><path d="M-12 22q0-30 12-30t12 30z" fill="#f9a8d4" /><circle cy="-10" r="10" fill="#ffd9b8" /><circle cx="-3.500" cy="-10" r="1.200" fill="#050a24" /><circle cx="3.500" cy="-10" r="1.200" fill="#050a24" /><path d="M-3-6q3 3 6 0" stroke="#050a24" fill="none" /><g transform="translate(0 -4)"><path d={hats[shape]} fill={hatCols[col]} /><circle cy={shape === 1 ? -36 : -31} r="2.500" fill="#fff" /></g></svg>
          <div className="space-y-3">
            <div className="flex gap-2">{hats.map((_, k) => <button key={k} type="button" onClick={() => setShape(k)} aria-pressed={k === shape} className={`rounded-full border px-4 py-1.5 text-sm ${k === shape ? 'border-amber-300 bg-amber-300/20' : 'border-white/20'}`}>{['Top hat', 'Pointy', 'Floppy'][k]}</button>)}</div>
            <div className="flex gap-2">{hatCols.map((c, k) => <button key={c} type="button" onClick={() => setCol(k)} aria-label={`Hat colour ${k + 1}`} aria-pressed={k === col} className={`size-8 rounded-full border-2 ${k === col ? 'scale-125 border-white' : 'border-white/20'}`} style={{ background: c }} />)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
