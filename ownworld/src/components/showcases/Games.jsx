import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const btn = 'rounded-full border px-5 py-2 text-sm font-bold hover:bg-white/10'

// TIDEPULL: two crews, one tide. Pull only as the swell rises.
const Tidepull = () => {
  const [pos, setPos] = useState(45)
  const [sw, setSw] = useState(0)
  const [state, setState] = useState('idle')
  const posRef = useRef(45)
  useEffect(() => {
    if (state !== 'play') return
    const id = setInterval(() => {
      posRef.current = Math.max(0, posRef.current - 0.5)
      setPos(posRef.current)
      setSw((Math.sin(Date.now() / 450) + 1) / 2)
      if (posRef.current <= 0) setState('lost')
    }, 40)
    return () => clearInterval(id)
  }, [state])
  const pull = () => {
    if (state !== 'play') return
    const good = sw > 0.72
    posRef.current = Math.min(100, Math.max(0, posRef.current + (good ? 9 : -7)))
    setPos(posRef.current)
    if (posRef.current >= 100) setState('won')
  }
  const start = () => { posRef.current = 45; setPos(45); setState('play') }
  return (
    <div>
      <div className="relative h-14 overflow-hidden rounded-full border border-white/20" style={{ background: 'linear-gradient(90deg,#7f1d1d,#0a1238 50%,#134e4a)' }}>
        <div className="absolute inset-y-0 w-1.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%`, boxShadow: '0 0 20px 6px #7dd3fc' }} />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/60">THE SEA</span>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/60">YOUR CREW</span>
      </div>
      <p className="mt-4 text-xs uppercase tracking-widest text-mist/60">Swell</p>
      <div className="relative mt-1 h-4 rounded-full bg-white/10">
        <div className="absolute inset-y-0 right-0 w-[28%] rounded-r-full bg-emerald-400/40" />
        <span className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300" style={{ left: `${sw * 100}%`, boxShadow: '0 0 14px #7dd3fc' }} />
      </div>
      <div className="mt-5 flex items-center gap-4">
        {state === 'play' ? <button type="button" onClick={pull} className={`${btn} border-sky-300 px-10 py-4 text-lg text-sky-200`}>PULL</button> : <button type="button" onClick={start} className={`${btn} border-sky-300 text-sky-200`}>{state === 'idle' ? 'Join the crew' : 'Pull again'}</button>}
        <p className="font-lore text-xl italic text-mist">{state === 'won' ? 'The tide is yours. Now lend half your light away.' : state === 'lost' ? 'The sea took it. Sit; try again.' : 'Tap PULL while the swell is in the green.'}</p>
      </div>
      <div className="mt-5 flex justify-center gap-2" aria-label="Spectators">
        {Array.from({ length: 14 }, (_, i) => <span key={i} className="h-5 w-3 rounded transition duration-300" style={{ background: i < (pos / 100) * 14 ? '#ffb347' : '#ffffff1a', boxShadow: i < (pos / 100) * 14 ? '0 0 12px #ffb347' : 'none' }} />)}
      </div>
    </div>
  )
}

// FOGSWEEP: clear fog to find lanterns; numbers count glowing neighbours.
const SIZE = 6
const LANTERNS = 6
const BREATHS = 16
const makeBoard = () => { const s = new Set(); while (s.size < LANTERNS) s.add(Math.floor(Math.random() * SIZE * SIZE)); return s }
const near = (i, s) => {
  const r = Math.floor(i / SIZE), c = i % SIZE
  let n = 0
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
    const rr = r + dr, cc = c + dc
    if ((dr || dc) && rr >= 0 && rr < SIZE && cc >= 0 && cc < SIZE && s.has(rr * SIZE + cc)) n++
  }
  return n
}

const Fogsweep = () => {
  const [board, setBoard] = useState(makeBoard)
  const [open, setOpen] = useState([])
  const found = open.filter((i) => board.has(i)).length
  const won = found === LANTERNS
  const lost = !won && open.length >= BREATHS
  const reveal = (i) => { if (!won && !lost && !open.includes(i)) setOpen((o) => [...o, i]) }
  return (
    <div>
      <div className="mx-auto grid w-full max-w-sm grid-cols-6 gap-1.5">
        {Array.from({ length: SIZE * SIZE }, (_, i) => {
          const isOpen = open.includes(i) || ((won || lost) && board.has(i))
          return (
            <button key={i} type="button" onClick={() => reveal(i)} aria-label={isOpen ? 'Cleared' : 'Fog'}
              className={`aspect-square rounded-lg border text-sm font-extrabold transition ${isOpen ? 'border-white/10 bg-abyss' : 'border-white/20 bg-indigo-300/20 hover:bg-indigo-300/40'}`}>
              {isOpen && (board.has(i) ? <span className="mx-auto block size-4 rounded-full bg-amber-300" style={{ boxShadow: '0 0 16px #ffb347' }} /> : <span className="text-sky-200">{near(i, board) || ''}</span>)}
            </button>
          )
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-lore text-xl italic text-mist">{won ? 'Every lantern found. The fog bows.' : lost ? 'The fog closed in. Lanterns revealed.' : `${found} of ${LANTERNS} lanterns · ${BREATHS - open.length} breaths left`}</p>
        <button type="button" onClick={() => { setBoard(makeBoard()); setOpen([]) }} className={`${btn} border-sky-300 text-sky-200`}>New fog</button>
      </div>
    </div>
  )
}

// ECHO RELAY: every teammate adds a note. Repeat the whole relay.
const COLORS = ['#ff7a8a', '#ffb347', '#3ff2d0', '#a78bfa']
const EchoRelay = () => {
  const [best, setBest] = useLocalStorage('thalune:echo', 0)
  const [seq, setSeq] = useState([])
  const [mode, setMode] = useState('idle')
  const [step, setStep] = useState(0)
  const [lit, setLit] = useState(null)
  useEffect(() => {
    if (mode !== 'show') return
    const ids = []
    seq.forEach((c, k) => {
      ids.push(setTimeout(() => setLit(c), k * 700 + 500))
      ids.push(setTimeout(() => setLit(null), k * 700 + 950))
    })
    ids.push(setTimeout(() => { setMode('input'); setStep(0) }, seq.length * 700 + 500))
    return () => ids.forEach(clearTimeout)
  }, [mode, seq])
  const rnd = () => Math.floor(Math.random() * 4)
  const start = () => { setSeq([rnd()]); setMode('show') }
  const press = (c) => {
    if (mode !== 'input') return
    setLit(c); setTimeout(() => setLit(null), 200)
    if (c !== seq[step]) { setMode('over'); return }
    if (step + 1 === seq.length) { setBest((b) => Math.max(b, seq.length)); setSeq((s) => [...s, rnd()]); setMode('show') } else setStep(step + 1)
  }
  return (
    <div className="text-center">
      <div className="mx-auto grid max-w-xs grid-cols-2 gap-4">
        {COLORS.map((c, i) => (
          <button key={c} type="button" onClick={() => press(i)} aria-label={`Lantern ${i + 1}`} className="aspect-square rounded-3xl border-2 transition duration-150"
            style={{ borderColor: c, background: lit === i ? c : `${c}22`, boxShadow: lit === i ? `0 0 50px ${c}` : 'none' }} />
        ))}
      </div>
      <p className="mt-4 font-lore text-xl italic text-mist">
        {mode === 'idle' ? 'Each teammate adds one note.' : mode === 'show' ? 'Watch the relay…' : mode === 'input' ? `Your turn: repeat all ${seq.length}` : `The relay broke at ${seq.length - 1} teammates.`} · Best {best}
      </p>
      {(mode === 'idle' || mode === 'over') && <button type="button" onClick={start} className={`${btn} mt-3 border-violet-300 text-violet-200`}>{mode === 'idle' ? 'Start the relay' : 'Run it again'}</button>}
    </div>
  )
}

const games = [
  { id: 'tidepull', n: 'Tidepull', c: '#7dd3fc', Comp: Tidepull, rules: ['wave>Two crews, one tide', 'bell>Pull only as the swell rises', 'lantern>Crowds glow for who they love'] },
  { id: 'fogsweep', n: 'Fogsweep', c: '#a78bfa', Comp: Fogsweep, rules: ['eye>Clear fog to find lanterns', 'gear>Numbers count glowing neighbours', 'moon>Sixteen breaths of fog'] },
  { id: 'echo', n: 'Echo Relay', c: '#ff7a8a', Comp: EchoRelay, rules: ['hand>Each teammate adds one note', 'bell>Repeat the whole relay', 'heart>One slip ends the relay'] },
]

export const TideGames = () => {
  const [i, setI] = useState(0)
  const g = games[i]
  return (
    <div className="rounded-2xl border p-6" style={{ borderColor: `${g.c}55`, background: `${g.c}0d` }}>
      <div className="flex flex-wrap gap-2">
        {games.map((x, k) => <button key={x.id} type="button" onClick={() => setI(k)} aria-pressed={k === i} className={`rounded-full border px-5 py-2 text-sm font-bold ${k === i ? 'bg-white/15' : 'text-mist/70 hover:text-white'}`} style={{ borderColor: x.c }}>{x.n}</button>)}
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {g.rules.map((r) => { const [ic, t] = r.split('>'); return <span key={r} className="flex items-center gap-2 font-lore text-base italic text-mist" style={{ color: g.c }}><Icon name={ic} className="size-5" /><span className="text-mist">{t}</span></span> })}
      </div>
      <div key={g.id} className="mt-6"><g.Comp /></div>
    </div>
  )
}
