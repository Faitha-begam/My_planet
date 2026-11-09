import { useState } from 'react'
import { Link } from 'react-router-dom'
import { chime } from '../audio'
import Character from '../components/Character'
import Descent from '../components/Descent'
import GlowTitle from '../components/GlowTitle'
import Planet from '../components/Planet'
import Scene from '../components/Scene'
import { realms, peopleById } from '../data/story'
import { useLocalStorage } from '../hooks/useLocalStorage'

const stars = Array.from({ length: 90 }, (_, i) => [(i * 47) % 100, (i * 29) % 100, 1 + (i % 3)])

const lines = ['A MESSAGE FOR YOU', 'Hello, hello! Is anybody out there?', 'We are the Bloomfolk of MIRABLOOM.', 'Every night our giant flowers glow, so you can find us.', 'Come and visit! We saved you a seat.']

// SCENE 1: the signal. You must tune it before it will speak.
const Signal = ({ onDone }) => {
  const [target] = useState(() => 25 + Math.floor(Math.random() * 55))
  const [v, setV] = useState(5)
  const [locked, setLocked] = useState(false)
  const [ready, setReady] = useState(false)
  const diff = Math.abs(v - target)
  const strength = locked ? 100 : Math.max(0, 100 - diff * 3)
  const change = (n) => {
    setV(n)
    if (!locked && Math.abs(n - target) <= 2) { setLocked(true); chime(660, 0.2); setTimeout(() => setReady(true), 6800) }
  }
  const pts = Array.from({ length: 70 }, (_, i) => {
    const noise = (Math.sin(i * 12.9898 + v * 3.1) * 43758.5453) % 1
    const y = 50 + Math.sin(i * 0.45) * 22 * (strength / 100) + noise * 34 * (1 - strength / 100)
    return `${(i / 69) * 300},${y.toFixed(1)}`
  }).join(' ')
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-black">
      {stars.map(([x, y, s], i) => <span key={i} className="tw absolute rounded-full bg-white" style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${(i % 7) * 0.4}s` }} />)}
      <div className="relative mx-auto flex min-h-full max-w-2xl flex-col justify-center gap-6 px-6 py-16 text-center">
        {!locked ? (<>
          <p className="text-xs uppercase tracking-[0.4em] text-mist/60">Station Halcyon-9 · Day 4,211</p>
          <h1 className="font-lore text-4xl italic sm:text-5xl">Something is saying hello…</h1>
          <svg viewBox="0 0 300 100" className="w-full" role="img" aria-label="Signal waveform"><polyline points={pts} fill="none" stroke={strength > 70 ? '#3ff2d0' : '#6b7cff'} strokeWidth="1.500" /></svg>
          <label className="block text-xs uppercase tracking-[0.3em] text-mist/70">Tune the dial · signal {Math.round(strength)}%
            <input type="range" min="0" max="100" value={v} onChange={(e) => change(+e.target.value)} className="mt-3 block w-full accent-amber-300" />
          </label>
          <p className="font-lore text-lg italic text-mist/70">Turn the dial until the fuzzy noise goes away.</p>
          <button type="button" onClick={onDone} className="mx-auto text-xs uppercase tracking-[0.3em] text-mist/50 hover:text-white">Skip the transmission →</button>
        </>) : (<>
          <svg viewBox="0 0 300 100" className="w-full" aria-hidden="true"><polyline points={pts} fill="none" stroke="#3ff2d0" strokeWidth="2" /></svg>
          {lines.map((l, i) => (
            <p key={l} className={`animate-[rise-in_.9s_ease-out_both] ${i === 0 ? 'text-xs uppercase tracking-[0.4em] text-phos' : 'font-lore text-2xl italic sm:text-3xl'}`} style={{ animationDelay: `${i * 1.3}s` }}>{l}</p>
          ))}
          {ready && <button type="button" onClick={onDone} className="mx-auto animate-[rise-in_.8s_ease-out_both] rounded-full border border-wick px-8 py-3 text-sm font-extrabold tracking-[0.3em] text-wick hover:bg-wick/10">I’M COMING!</button>}
        </>)}
      </div>
    </div>
  )
}

const doors = [
  ['/origins', '1', 'Origins', 'How a sleepy planet woke up and grew flowers', 'abyss', '#818cf8'],
  ['/world', '2', 'The World', 'A map of the towns, beaches and gardens', 'nature', '#34d399'],
  ['/realms', '3', 'The Realms', 'Twelve places to see how everyone lives: games, school, food, parties…', 'city', '#ffb347'],
  ['/people', '4', 'The People', 'Meet the twelve friends who will show you around', 'family', '#fda4af'],
]

// SCENE 3: you have landed. Four doors, in the order of the story.
const Shore = ({ onReplay }) => {
  const sael = peopleById.kiki
  const loop = [...realms, ...realms]
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute -right-[20%] top-[6%] w-[min(120vw,44rem)] sm:right-[2%]"><Planet /></div>
      <div className="relative z-10 flex min-h-screen flex-col justify-end px-4 pb-8 pt-24 sm:px-10">
        <div className="mb-4 flex items-end gap-3">
          <Character kind={sael.kind} color={sael.color} className="h-44 sm:h-64" />
          <p className="mb-16 max-w-xs rounded-2xl rounded-bl-none border border-white/20 bg-deep/80 p-4 font-lore text-lg italic sm:text-xl">“Hello! I’m so happy you’re here. Where shall we go first?”<span className="mt-1 block text-xs not-italic text-mist/60">{sael.name}, {sael.role}</span></p>
        </div>
        <GlowTitle word="MIRABLOOM" />
        <p className="mt-1 font-lore text-xl italic text-mist/80 sm:text-2xl">The planet that blooms at night.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {doors.map(([to, n, t, line, scene, c]) => (
            <Link key={to} to={to} className="group relative overflow-hidden rounded-t-[3rem] rounded-b-xl border bg-deep/60 transition hover:-translate-y-1" style={{ borderColor: `${c}66` }}>
              <Scene id={scene} color={c} className="h-28 w-full transition duration-700 group-hover:scale-110" />
              <div className="p-4"><p className="text-xs font-extrabold tracking-[0.3em]" style={{ color: c }}>CHAPTER {n}</p><p className="text-xl font-extrabold uppercase">{t}</p><p className="font-lore text-base italic text-mist">{line}</p></div>
            </Link>
          ))}
        </div>
        <div className="mt-6 overflow-hidden" aria-label="Glimpses of the realms">
          <div className="flex w-max gap-3" style={{ animation: 'marquee 60s linear infinite' }}>
            {loop.map((r, i) => (
              <Link key={i} to={`/realms/${r.id}`} className="relative block h-24 w-40 shrink-0 overflow-hidden rounded-xl border border-white/10" tabIndex={i >= realms.length ? -1 : 0}>
                <Scene id={r.scene} color={r.color} className="h-full w-full" />
                <span className="absolute inset-x-0 bottom-0 bg-abyss/70 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest">{r.short}</span>
              </Link>
            ))}
          </div>
        </div>
        <button type="button" onClick={onReplay} className="mt-4 w-fit text-xs uppercase tracking-[0.3em] text-mist/50 hover:text-white">Replay the transmission</button>
      </div>
    </main>
  )
}

const Landing = () => {
  const [arrived, setArrived] = useLocalStorage('mirabloom:arrived', false)
  const [stage, setStage] = useState(arrived ? 'shore' : 'signal')
  const land = () => { setArrived(true); setStage('shore') }
  if (stage === 'signal') return <Signal onDone={() => setStage('descent')} />
  if (stage === 'descent') return <Descent onDone={land} />
  return <Shore onReplay={() => setStage('signal')} />
}

export { Shore }
export default Landing
