import { useState } from 'react'
import Scene from '../Scene'

const clubs = [
  { n: 'Cloud-Painters', scene: 'hobbies', c: '#f9a8d4', line: 'We paint pictures on the evening clouds.' },
  { n: 'Puddle-Jumpers', scene: 'recreation', c: '#7dd3fc', line: 'We jump in puddles. The splashier the better.' },
  { n: 'Kite Builders', scene: 'playgrounds', c: '#a78bfa', line: 'We build kites and see who can fly one the highest.' },
  { n: 'Moon-Gardeners', scene: 'nature', c: '#86efac', line: 'We grow flowers that only open at night.' },
  { n: 'Shadow-Puppet Garage', scene: 'cinema', c: '#fbbf24', line: 'We make shadow animals with our hands.' },
]
const palette = ['#f9a8d4', '#7dd3fc', '#fbbf24', '#86efac', '#c4b5fd', '#ffffff']
const ideas = ['Say good morning to a tree.', 'Make a hat out of leaves.', 'Draw a map of your bedroom.', 'Teach a pebble to roll.', 'Build a fort with every pillow you can find.', 'Count how many clouds look like rabbits.', 'Invent a new handshake with a friend.', 'Hum a song to a flower.', 'Race a snail. Let it win.', 'Make a very small boat and float it.']

// Free time: join a club, paint the sky, or open the Boredom Box.
export const Hobbies = () => {
  const [i, setI] = useState(0)
  const [dots, setDots] = useState([])
  const [col, setCol] = useState(palette[0])
  const [idea, setIdea] = useState(null)
  const [n, setN] = useState(0)
  const c = clubs[i]
  const paint = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setDots((d) => [...d, { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, c: col, r: 3 + (d.length % 4) * 2 }])
  }
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-5" style={{ borderColor: `${c.c}55`, background: `${c.c}0d` }}>
        <p className="font-lore text-xl italic text-mist">Which club will you join tonight?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {clubs.map((x, k) => <button key={x.n} type="button" onClick={() => setI(k)} aria-pressed={k === i} className={`rounded-full border px-4 py-1.5 text-sm ${k === i ? 'bg-white/15' : 'text-mist/70 hover:text-white'}`} style={{ borderColor: x.c }}>{x.n}</button>)}
        </div>
        <div key={i} className="mt-4 grid animate-[rise-in_.4s_ease-out] gap-4 sm:grid-cols-2">
          <Scene id={c.scene} color={c.c} className="h-48 w-full rounded-xl" />
          <div className="flex flex-col justify-center"><p className="text-3xl font-extrabold" style={{ color: c.c }}>{c.n}</p><p className="mt-2 font-lore text-2xl italic">{c.line}</p></div>
        </div>
      </div>
      <div className="rounded-2xl border border-pink-300/30 bg-pink-300/5 p-5">
        <p className="font-lore text-xl italic">Cloud-painting: tap the sky to paint puffy clouds.</p>
        <div className="relative mt-3 h-52 cursor-crosshair overflow-hidden rounded-xl bg-gradient-to-b from-indigo-950 to-indigo-700/60" role="presentation" onClick={paint}>
          {dots.map((d, k) => <span key={k} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[2px]" style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.r * 4}px`, height: `${d.r * 3}px`, background: d.c, opacity: 0.8 }} />)}
          {dots.length === 0 && <p className="pointer-events-none absolute inset-0 grid place-items-center font-lore text-lg italic text-mist/50">Tap anywhere</p>}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {palette.map((p) => <button key={p} type="button" onClick={() => setCol(p)} aria-label={`Paint colour ${p}`} aria-pressed={col === p} className={`size-8 rounded-full border-2 ${col === p ? 'scale-125 border-white' : 'border-white/20'}`} style={{ background: p }} />)}
          <button type="button" onClick={() => setDots([])} className="ml-auto rounded-full border border-white/30 px-4 py-1 text-xs hover:bg-white/10">Clear the sky</button>
        </div>
      </div>
      <div className="rounded-2xl border border-lime-300/30 bg-lime-300/5 p-5 text-center">
        <p className="font-lore text-xl italic">Feeling bored? Everyone has a Boredom Box.</p>
        <button type="button" onClick={() => { setIdea(ideas[Math.floor(Math.random() * ideas.length)]); setN((x) => x + 1) }} className="mt-3 rounded-full border border-lime-300 px-6 py-2 text-sm font-bold text-lime-200 hover:bg-white/10">Open the Boredom Box</button>
        {idea && <p key={n} className="mt-4 animate-[rise-in_.4s_ease-out] text-2xl font-extrabold text-lime-100">{idea}</p>}
      </div>
    </div>
  )
}

const customs = [
  { n: 'The Hello-Pebble', q: 'How do strangers become friends?', scene: 'friends', c: '#fda4af', steps: ['Say “hello!” and smile', 'Swap a smooth pebble', 'Now you’re friends. Keep the pebble in your pocket!'] },
  { n: 'The Bubble Parade', q: 'What happens on birthdays?', scene: 'festivals', c: '#f9a8d4', steps: ['Friends gather outside your door', 'They blow hundreds of bubbles', 'You walk through the bubbles, and the whole street cheers'] },
  { n: 'Sorry-Soup', q: 'What if friends have a mix-up?', scene: 'family', c: '#ffb347', steps: ['Both friends cook a little soup together', 'Each says what went wrong, and what they’ll do next time', 'Eat the soup. It’s all better!'] },
  { n: 'The Welcome Wagon', q: 'What happens when someone new arrives?', scene: 'hospitality', c: '#7dd3fc', steps: ['A wagon pulls up with a hello-cake', 'Neighbours show them around', 'They get a rope bridge to a new friend’s house'] },
]

// How friendships begin, grow and mend: four customs you can step through.
export const Traditions = () => {
  const [i, setI] = useState(0)
  const [step, setStep] = useState(0)
  const c = customs[i]
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: `${c.c}55`, background: `${c.c}0d` }}>
      <div className="flex flex-wrap gap-2">
        {customs.map((x, k) => <button key={x.n} type="button" onClick={() => { setI(k); setStep(0) }} aria-pressed={k === i} className={`rounded-full border px-4 py-1.5 text-sm ${k === i ? 'bg-white/15' : 'text-mist/70 hover:text-white'}`} style={{ borderColor: x.c }}>{x.n}</button>)}
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.3em]" style={{ color: c.c }}>{c.q}</p>
      <div className="mt-2 grid gap-4 sm:grid-cols-2">
        <Scene key={i} id={c.scene} color={c.c} className="h-52 w-full animate-[page-in_.5s_ease-out] rounded-xl" />
        <ol className="space-y-2">
          {c.steps.map((s, k) => (
            <li key={s}><button type="button" onClick={() => setStep(k)} aria-current={k === step} className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${k === step ? 'bg-white/10' : 'opacity-60 hover:opacity-100'}`} style={{ borderColor: k === step ? c.c : '#ffffff22' }}>
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-sm font-extrabold" style={{ background: c.c, color: '#050a24' }}>{k + 1}</span><span className="font-lore text-lg italic">{s}</span></button></li>
          ))}
        </ol>
      </div>
      <button type="button" onClick={() => setStep((s) => (s + 1) % 3)} className="mt-4 rounded-full border px-5 py-2 text-sm font-bold hover:bg-white/10" style={{ borderColor: c.c, color: c.c }}>Next step →</button>
    </div>
  )
}
