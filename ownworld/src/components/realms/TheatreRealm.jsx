import { useState } from 'react'
import { tone } from '../../audio'
import { DreamLoom } from '../showcases/Dream'
import { films } from '../../data/content'
import { Poster } from '../showcases/Culture'
import Scene from '../Scene'

const notes = [196, 220, 262, 294, 330, 392]

// Music: six singers. Tap to add a voice; conduct them in order. Turn sound on to hear it.
const HumChoir = () => {
  const [on, setOn] = useState([])
  const [pulse, setPulse] = useState(null)
  const flash = (i) => { tone(notes[i]); setPulse(i); setTimeout(() => setPulse(null), 400) }
  const hit = (i) => { flash(i); setOn((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i])) }
  const conduct = () => [...on].sort().forEach((i, k) => setTimeout(() => flash(i), k * 450))
  return (
    <div className="rounded-2xl border border-pink-300/30 bg-pink-300/5 p-6 text-center">
      <p className="font-lore text-2xl italic">The Hum Choir: music is felt in the ribs.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-4">
        {notes.map((n, i) => (
          <button key={n} type="button" onClick={() => hit(i)} aria-pressed={on.includes(i)} aria-label={`Singer ${i + 1}`}
            className="grid size-16 place-items-center rounded-full border-2 transition duration-300" style={{ borderColor: '#f472b6', background: on.includes(i) ? '#f472b655' : 'transparent', transform: pulse === i ? 'scale(1.3)' : 'scale(1)', boxShadow: pulse === i ? '0 0 40px #f472b6' : 'none' }}>
            <span className="h-3 w-5 rounded-b-full bg-pink-200" style={{ height: on.includes(i) ? 12 : 4 }} />
          </button>
        ))}
      </div>
      <button type="button" onClick={conduct} disabled={!on.length} className="mt-5 rounded-full border border-pink-300 px-6 py-2 text-sm text-pink-200 enabled:hover:bg-white/10 disabled:opacity-40">Conduct the choir</button>
      <p className="mt-2 text-xs text-mist/60">Tap singers to add voices. Turn the sound on (top right) to hear them.</p>
    </div>
  )
}

const TheatreRealm = () => {
  const [i, setI] = useState(0)
  const f = films[i]
  return (
    <div className="space-y-8">
      <div className="relative h-72 overflow-hidden rounded-3xl border border-violet-300/30">
        <Scene id="cinema" color={f.a} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-abyss/50" />
        <p className="absolute inset-x-0 top-6 text-center text-xs font-extrabold tracking-[0.4em] text-violet-200">NOW SHOWING IN THE DREAM CAVERNS</p>
        <p key={i} className="absolute inset-x-0 top-1/2 -translate-y-1/2 animate-[rise-in_.6s_ease-out] px-4 text-center text-4xl font-extrabold uppercase sm:text-6xl" style={{ color: f.a, textShadow: `0 0 40px ${f.a}` }}>{f.t}</p>
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-rose-950 to-rose-800" style={{ animation: 'curtl 2.5s ease-in-out .4s forwards' }} />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-rose-950 to-rose-800" style={{ animation: 'curtr 2.5s ease-in-out .4s forwards' }} />
      </div>
      <div>
        <h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">The poster wall · tap a film for its trailer</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {films.map((x, k) => (
            <button key={x.t} type="button" onClick={() => setI(k)} aria-pressed={k === i} aria-label={x.t} className={`transition ${k === i ? 'scale-105' : 'opacity-60 hover:opacity-100'}`} style={{ filter: k === i ? `drop-shadow(0 0 20px ${x.a})` : 'none' }}><Poster f={x} i={k} className="w-full" /></button>
          ))}
        </div>
        <div key={i} className="mt-4 space-y-1 rounded-2xl border border-white/10 bg-abyss/70 p-5 text-center font-lore text-2xl italic">
          {['In a world of fog…', f.tag, `“${f.t}”`].map((t, k) => <p key={t} className="animate-[rise-in_.8s_ease-out_both]" style={{ animationDelay: `${k * 0.9}s`, color: k === 2 ? f.a : undefined }}>{t}</p>)}
        </div>
      </div>
      <div><h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">The dream loom · make your own film</h2><DreamLoom /></div>
      <HumChoir />
    </div>
  )
}

export default TheatreRealm
