import { useState } from 'react'
import { Poster } from './Culture'

const settings = ['a drowned market', 'a lantern forest', 'the underside of a wave']
const feelings = [['Hush', '#818cf8', '#1e1b4b', 'Nobody speaks. Everyone understands.'], ['Wonder', '#3ff2d0', '#134e4a', 'The sea opens like a book.'], ['Ache', '#fb7185', '#4c0519', 'You miss a place you have never been.']]
const creatures = [['Glass Whale', 2], ['Wick-Moth', 0], ['Tide', 1]]

const Row = ({ label, items, value, set }) => (
  <div>
    <p className="text-xs uppercase tracking-[0.25em] text-mist/60">{label}</p>
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((x, i) => <button key={x} type="button" aria-pressed={value === i} onClick={() => set(i)} className={`rounded-full border px-4 py-1.5 text-sm ${value === i ? 'border-violet-300 bg-violet-300/20' : 'border-white/20 text-mist hover:text-white'}`}>{x}</button>)}
    </div>
  </div>
)

// Cinema: films are dreamed in a shared sleep. Choose the dream, set its depth.
export const DreamLoom = () => {
  const [s, setS] = useState(0)
  const [f, setF] = useState(1)
  const [c, setC] = useState(0)
  const [depth, setDepth] = useState(40)
  const [fe, , , tag] = [feelings[f][0], feelings[f][1], feelings[f][2], feelings[f][3]]
  const film = { t: `The ${fe} of the ${creatures[c][0]}`, a: feelings[f][1], b: feelings[f][2] }
  const roll = () => { setS(Math.floor(Math.random() * 3)); setF(Math.floor(Math.random() * 3)); setC(Math.floor(Math.random() * 3)) }
  return (
    <div className="grid gap-6 rounded-2xl border border-white/10 bg-violet-500/5 p-6 md:grid-cols-[14rem_1fr]">
      <div className="relative mx-auto w-52">
        <div className="absolute -inset-6 -z-10 rounded-full blur-3xl" style={{ background: film.a, opacity: 0.3 }} />
        <Poster f={film} i={creatures[c][1]} className="w-full drop-shadow-2xl" />
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-indigo-200 blur-md transition" style={{ opacity: (depth / 100) * 0.35 }} />
      </div>
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-violet-300">Dreamed in {settings[s]} · Genre: {fe} (genres are moods)</p>
        <p className="font-lore text-2xl italic">{tag}</p>
        <Row label="Setting" items={settings} value={s} set={setS} />
        <Row label="Feeling" items={feelings.map((x) => x[0])} value={f} set={setF} />
        <Row label="Creature" items={creatures.map((x) => x[0])} value={c} set={setC} />
        <label className="block text-xs uppercase tracking-[0.25em] text-mist/60">Dream depth
          <input type="range" min="0" max="100" value={depth} onChange={(e) => setDepth(+e.target.value)} className="mt-2 block w-full accent-violet-300" />
        </label>
        <div className="flex items-center gap-1.5" aria-label="Sleeping audience">
          {Array.from({ length: 10 }, (_, i) => <span key={i} className="h-4 w-8 rounded-full transition duration-500" style={{ background: i < depth / 10 ? film.a : '#ffffff1a', boxShadow: i < depth / 10 ? `0 0 12px ${film.a}` : 'none' }} />)}
          <span className="ml-2 text-xs text-mist/60">{Math.round(depth / 10)} of 10 asleep</span>
        </div>
        <button type="button" onClick={roll} className="rounded-full border border-violet-300 px-5 py-2 text-sm text-violet-200 hover:bg-white/10">Dream a random film</button>
      </div>
    </div>
  )
}
