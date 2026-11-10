import { useEffect, useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

// Tideplay: catch the wisps before the fog takes them.
export const WispGame = ({ compact }) => {
  const [best, setBest] = useLocalStorage('thalune:wispbest', 0)
  const [run, setRun] = useState(false)
  const [score, setScore] = useState(0)
  const [left, setLeft] = useState(20)
  const [wisps, setWisps] = useState([])

  const active = run && left > 0

  useEffect(() => {
    if (!active) return
    const spawn = setInterval(() => setWisps((w) => [...w.slice(-5), { id: Math.random(), x: 8 + Math.random() * 84, y: 12 + Math.random() * 72 }]), 650)
    const tick = setInterval(() => setLeft((l) => l - 1), 1000)
    return () => { clearInterval(spawn); clearInterval(tick) }
  }, [active])

  const start = () => { setScore(0); setLeft(20); setWisps([]); setRun(true) }
  const catchWisp = (id) => {
    setScore((s) => s + 1)
    setBest((b) => Math.max(b, score + 1))
    setWisps((w) => w.filter((x) => x.id !== id))
  }

  return (
    <div>
      <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-rose-500/10 to-abyss ${compact ? 'h-44' : 'h-72'}`}>
        {active && wisps.map((w) => (
          <button key={w.id} type="button" aria-label="Catch wisp" onClick={() => catchWisp(w.id)}
            className="fl absolute size-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${w.x}%`, top: `${w.y}%`, background: 'radial-gradient(circle,#fff,#ff7a8a 45%,transparent 70%)', boxShadow: '0 0 24px #ff7a8a' }} />
        ))}
        {!active && (
          <button type="button" onClick={start} className="absolute inset-0 grid place-items-center text-lg font-extrabold tracking-widest text-rose-200 hover:text-white">
            {run ? `CAUGHT ${score} · PLAY AGAIN` : 'TAP TO START'}
          </button>
        )}
      </div>
      <p className="mt-2 flex justify-between text-xs uppercase tracking-widest text-mist/70">
        <span>Wisps {score}</span><span>Best {best}</span><span>{active ? `${left}s` : '20s round'}</span>
      </p>
    </div>
  )
}

// Night of a Thousand Wicks: release a lantern, watch the sea answer.
export const Release = ({ compact }) => {
  const [total, setTotal] = useLocalStorage('thalune:released', 0)
  const [floating, setFloating] = useState([])
  const release = (x = 10 + Math.random() * 80) => {
    setFloating((f) => [...f, { id: Math.random(), x }])
    setTotal((t) => t + 1)
  }
  return (
    <div>
      <div role="presentation" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); release(((e.clientX - r.left) / r.width) * 100) }}
        className={`relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-abyss via-indigo-950 to-pink-900/40 ${compact ? 'h-44' : 'h-72'}`}>
        {floating.map((l) => (
          <span key={l.id} onAnimationEnd={() => setFloating((f) => f.filter((x) => x.id !== l.id))}
            className="absolute bottom-3 h-6 w-4 -translate-x-1/2 rounded-md"
            style={{ left: `${l.x}%`, background: 'linear-gradient(#fff,#ffb347)', boxShadow: '0 0 28px 6px #ffb34777', animation: 'lift 9s ease-in forwards' }} />
        ))}
        <p className="pointer-events-none absolute inset-x-0 top-3 text-center font-lore text-sm italic text-mist/60">tap the sea</p>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs uppercase tracking-widest text-mist/70">
        <span>{total} lanterns released</span>
        <button type="button" onClick={() => release()} className="rounded-full border border-pink-300/50 px-3 py-1 text-pink-200 hover:bg-white/10">Release one</button>
      </div>
    </div>
  )
}

// The Mending Reefs: a Dimming remedy. Breathe with the reef.
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
        <div className="size-40 rounded-full" style={{
          background: 'radial-gradient(circle,#fff,#86efac 40%,transparent 70%)',
          boxShadow: '0 0 60px #86efac88', transform: `scale(${big ? 1.4 : 0.7})`,
          transition: `transform ${phase === 'in' ? 4 : 6}s ease-in-out`,
        }} />
      </div>
      <p className="font-lore text-2xl italic text-emerald-100">{on ? (phase === 'in' ? 'Breathe in…' : 'Breathe out…') : 'A reef-healer’s remedy: four in, six out.'}</p>
      <button type="button" onClick={() => { setOn((o) => !o); setPhase('in') }} className="rounded-full border border-emerald-300/60 px-5 py-2 text-sm text-emerald-200 hover:bg-white/10">
        {on ? 'Rest' : 'Begin'}
      </button>
    </div>
  )
}
