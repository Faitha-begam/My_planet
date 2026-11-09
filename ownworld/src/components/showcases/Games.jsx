import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const btn = 'rounded-full border px-5 py-2 text-sm font-bold hover:bg-white/10'

// CLOUD HOP: tap HOP while the bouncing ball is over the glowing patch. Five clouds to cross.
const CloudHop = () => {
  const [run, setRun] = useState(false)
  const [pos, setPos] = useState(0)
  const [round, setRound] = useState(0)
  const [made, setMade] = useState(0)
  const [msg, setMsg] = useState('')
  const dir = useRef(1)
  const p = useRef(0)
  const zone = 34 - round * 5
  useEffect(() => {
    if (!run) return
    const id = setInterval(() => {
      p.current += dir.current * (1.6 + round * 0.5)
      if (p.current >= 100 || p.current <= 0) dir.current *= -1
      p.current = Math.min(100, Math.max(0, p.current))
      setPos(p.current)
    }, 25)
    return () => clearInterval(id)
  }, [run, round])
  const hop = () => {
    if (!run) return
    const hit = Math.abs(p.current - 50) <= zone / 2
    setMsg(hit ? 'Boing! Nice hop!' : 'Oops, a wobble! Next cloud.')
    if (hit) setMade((m) => m + 1)
    if (round === 4) setRun(false); else setRound((r) => r + 1)
  }
  const start = () => { setRun(true); setRound(0); setMade(0); setMsg(''); p.current = 0 }
  const over = !run && (round === 4 && msg !== '')
  return (
    <div>
      <svg viewBox="0 0 300 70" className="w-full" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={30 + i * 60} cy="56" rx="22" ry="8" fill={i < made ? '#fbbf24' : '#cfd8ff'} opacity={i < made ? 0.9 : 0.3} />)}
        <circle cx={30 + Math.min(made, 4) * 60} cy={40} r="9" fill="#ff7a8a" className="fl" />
      </svg>
      <div className="relative mt-2 h-8 rounded-full bg-white/10">
        <div className="absolute inset-y-0 rounded-full bg-emerald-400/50" style={{ left: `${50 - zone / 2}%`, width: `${zone}%` }} />
        <span className="absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300" style={{ left: `${pos}%`, boxShadow: '0 0 14px #ff7a8a' }} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {run ? <button type="button" onClick={hop} className={`${btn} border-rose-300 px-10 py-4 text-lg text-rose-200`}>HOP!</button> : <button type="button" onClick={start} className={`${btn} border-rose-300 text-rose-200`}>{over ? 'Play again' : 'Start hopping'}</button>}
        <p className="font-lore text-xl italic text-mist">{over ? `You hopped ${made} of 5 clouds!` : msg || 'Tap HOP when the ball is over the green patch.'}</p>
      </div>
    </div>
  )
}

// MEMORY PAIRS: flip two cards. Find all six matching friends.
const faces = ['#f9a8d4', '#86efac', '#fbbf24', '#7dd3fc', '#c4b5fd', '#fb7185']
const deal = () => [...faces, ...faces].map((c, i) => ({ c, k: i, r: Math.random() })).sort((a, b) => a.r - b.r)
const Pairs = () => {
  const [cards, setCards] = useState(deal)
  const [up, setUp] = useState([])
  const [done, setDone] = useState([])
  const [moves, setMoves] = useState(0)
  const flip = (k) => {
    if (up.length === 2 || up.includes(k) || done.includes(k)) return
    const n = [...up, k]
    setUp(n)
    if (n.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = n.map((x) => cards.find((c) => c.k === x))
      if (a.c === b.c) { setDone((d) => [...d, ...n]); setUp([]) } else setTimeout(() => setUp([]), 800)
    }
  }
  return (
    <div>
      <div className="mx-auto grid max-w-sm grid-cols-4 gap-2">
        {cards.map((c) => {
          const open = up.includes(c.k) || done.includes(c.k)
          return (
            <button key={c.k} type="button" onClick={() => flip(c.k)} aria-label={open ? 'Friend' : 'Hidden card'} className="aspect-square rounded-xl border border-white/20 transition" style={{ background: open ? '#0a1238' : '#6366f133' }}>
              {open && <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="14" fill={c.c} /><circle cx="15" cy="18" r="2" fill="#050a24" /><circle cx="25" cy="18" r="2" fill="#050a24" /><path d="M14 25q6 5 12 0" stroke="#050a24" fill="none" strokeWidth="1.500" /></svg>}
            </button>
          )
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="font-lore text-xl italic text-mist">{done.length === 12 ? `You found all six friends in ${moves} tries!` : `${done.length / 2} of 6 friends found · ${moves} tries`}</p>
        <button type="button" onClick={() => { setCards(deal()); setUp([]); setDone([]); setMoves(0) }} className={`${btn} border-violet-300 text-violet-200`}>Shuffle</button>
      </div>
    </div>
  )
}

// PILLOW STACK: drop the sliding pillow on the pile. Only the part that lands on the pile stays.
const Stack = () => {
  const [best, setBest] = useLocalStorage('mirabloom:pillows', 0)
  const [blocks, setBlocks] = useState([{ x: 35, w: 30 }])
  const [mx, setMx] = useState(0)
  const [state, setState] = useState('idle')
  const dir = useRef(1)
  const top = blocks[blocks.length - 1]
  useEffect(() => {
    if (state !== 'play') return
    const speed = 1.2 + blocks.length * 0.12
    const id = setInterval(() => {
      setMx((m) => {
        let n = m + dir.current * speed
        if (n >= 100 - top.w) { n = 100 - top.w; dir.current = -1 }
        if (n <= 0) { n = 0; dir.current = 1 }
        return n
      })
    }, 25)
    return () => clearInterval(id)
  }, [state, blocks.length, top.w])
  const drop = () => {
    if (state !== 'play') return
    const l = Math.max(mx, top.x), r = Math.min(mx + top.w, top.x + top.w)
    if (r - l <= 1) { setState('over'); setBest((b) => Math.max(b, blocks.length - 1)); return }
    setBlocks((b) => [...b, { x: l, w: r - l }])
  }
  const start = () => { setBlocks([{ x: 35, w: 30 }]); setMx(0); dir.current = 1; setState('play') }
  const shift = Math.max(0, blocks.length - 9) * 9
  return (
    <div className="text-center">
      <svg viewBox="0 0 100 100" className="mx-auto h-72 w-56 rounded-2xl border border-white/10 bg-abyss/40" aria-label="Pillow pile">
        {blocks.map((b, i) => <rect key={i} x={b.x} y={100 - (i + 1) * 9 + shift} width={b.w} height="8" rx="3" fill={['#f9a8d4', '#c4b5fd', '#7dd3fc', '#fbbf24'][i % 4]} />)}
        {state === 'play' && <rect x={mx} y={100 - (blocks.length + 1) * 9 + shift} width={top.w} height="8" rx="3" fill="#fff" opacity=".8" />}
      </svg>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
        {state === 'play' ? <button type="button" onClick={drop} className={`${btn} border-amber-300 px-10 py-4 text-lg text-amber-200`}>DROP</button> : <button type="button" onClick={start} className={`${btn} border-amber-300 text-amber-200`}>{state === 'idle' ? 'Start stacking' : 'Stack again'}</button>}
        <p className="font-lore text-xl italic text-mist">{state === 'over' ? `Wobble! Your pile is ${blocks.length - 1} high.` : `Pile: ${blocks.length - 1} · Best: ${best}`}</p>
      </div>
    </div>
  )
}

const games = [
  { id: 'hop', n: 'Cloud Hop', c: '#ff7a8a', Comp: CloudHop, rules: ['ball>Watch the bouncing ball', 'hand>Tap HOP over the green patch', 'star>Cross five clouds'] },
  { id: 'pairs', n: 'Memory Pairs', c: '#a78bfa', Comp: Pairs, rules: ['eye>Flip two cards', 'heart>Find the matching friends', 'star>Find all six'] },
  { id: 'stack', n: 'Pillow Stack', c: '#fbbf24', Comp: Stack, rules: ['cloud>A pillow slides side to side', 'hand>Tap DROP to land it', 'star>Build the tallest pile'] },
]

export const PlayGames = () => {
  const [i, setI] = useState(0)
  const g = games[i]
  return (
    <div className="rounded-2xl border p-6" style={{ borderColor: `${g.c}55`, background: `${g.c}0d` }}>
      <p className="font-lore text-xl italic text-mist">Pick a game. Everyone on Mirabloom plays all three!</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {games.map((x, k) => <button key={x.id} type="button" onClick={() => setI(k)} aria-pressed={k === i} className={`rounded-full border px-5 py-2 text-sm font-bold ${k === i ? 'bg-white/15' : 'text-mist/70 hover:text-white'}`} style={{ borderColor: x.c }}>{x.n}</button>)}
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {g.rules.map((r) => { const [ic, t] = r.split('>'); return <span key={r} className="flex items-center gap-2 font-lore text-base italic text-mist"><span style={{ color: g.c }}><Icon name={ic} className="size-5" /></span>{t}</span> })}
      </div>
      <div key={g.id} className="mt-6"><g.Comp /></div>
    </div>
  )
}
