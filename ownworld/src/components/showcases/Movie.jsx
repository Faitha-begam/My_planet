import { useState } from 'react'
import Scene from '../Scene'

const story = {
  start: { t: 'Pip the little cloud-hopper is lost in the Whispering Garden. It is getting dark!', scene: 'nature', opts: [['Red scarf: follow the glow', 'glow'], ['Blue scarf: ask the friendly fog', 'fog']] },
  glow: { t: 'The glow leads to a giant sleepy flower. Something tiny is snoring inside…', scene: 'nature', opts: [['Red scarf: peek in', 'hug'], ['Blue scarf: tiptoe past', 'slide']] },
  fog: { t: 'The fog whispers, “Follow the fireflies!” They spin round and zoom up a hill.', scene: 'abyss', opts: [['Red scarf: zoom with them', 'slide'], ['Blue scarf: catch one', 'party']] },
  hug: { t: 'It’s a tiny dragon! It sneezes sparkles and gives Pip a great big hug. New best friend!', scene: 'friends', end: true },
  slide: { t: 'Pip finds a secret slide. Wheee! It goes all the way home, just in time for supper.', scene: 'playgrounds', end: true },
  party: { t: 'The firefly in Pip’s hand giggles. Hundreds more arrive, and it turns into a surprise party!', scene: 'festivals', end: true },
}

// Cloud Cinema: the audience waves a red or blue scarf to choose. Same movie, different ending.
export const MiniMovie = () => {
  const [at, setAt] = useState('start')
  const [path, setPath] = useState(0)
  const n = story[at]
  const pick = (to) => { setAt(to); setPath((p) => p + 1) }
  return (
    <div className="overflow-hidden rounded-2xl border border-violet-300/30">
      <div className="relative">
        <Scene key={at} id={n.scene} color="#a78bfa" className="h-64 w-full animate-[page-in_.6s_ease-out] sm:h-80" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss via-abyss/70 to-transparent p-5">
          <p key={at} className="animate-[rise-in_.6s_ease-out] font-lore text-2xl italic">{n.t}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 bg-deep/70 p-4">
        {n.end ? <button type="button" onClick={() => { setAt('start'); setPath(0) }} className="rounded-full border border-violet-300 px-6 py-2 text-sm font-bold text-violet-200 hover:bg-white/10">The end! Watch it again</button>
          : n.opts.map(([label, to], i) => <button key={to} type="button" onClick={() => pick(to)} className="rounded-full border-2 px-5 py-2 text-sm font-bold hover:bg-white/10" style={{ borderColor: i ? '#60a5fa' : '#fb7185', color: i ? '#93c5fd' : '#fda4af' }}>{label}</button>)}
        <span className="ml-auto text-xs text-mist/60">{path === 0 ? 'Wave a scarf to choose what happens' : `${path} choice${path === 1 ? '' : 's'} made`}</span>
      </div>
    </div>
  )
}
