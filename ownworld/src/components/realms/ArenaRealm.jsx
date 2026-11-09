import { useState } from 'react'
import Character from '../Character'
import Scene from '../Scene'
import { PlayGames } from '../showcases/Games'

const ticker = 'THE BOUNCE & HOP GAMES · TODAY ON BOUNCE MEADOW · EVERYONE PLAYS · EVERYONE CHEERS · '

// Bounce Meadow: a big populated arena, a crowd cheering, and the players at the front.
const Stadium = () => (
  <div className="relative overflow-hidden rounded-3xl border border-rose-300/30">
    <div className="overflow-hidden whitespace-nowrap border-b border-rose-300/20 bg-rose-500/10 py-1.5 text-xs font-extrabold tracking-[0.3em] text-rose-200">
      <div className="inline-block" style={{ animation: 'marquee 30s linear infinite' }}>{ticker}{ticker}{ticker}{ticker}</div>
    </div>
    <Scene id="gaming" color="#ff7a8a" className="h-64 w-full sm:h-80" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-around px-6">
      <Character kind="ball" color="#ff7a8a" className="h-28 sm:h-40" /><Character kind="flower" color="#fbbf24" className="h-32 sm:h-48" /><Character kind="oar" color="#7dd3fc" className="h-28 sm:h-40" />
    </div>
  </div>
)

// The Everybody-Wins Ribbons: the winner starts with three ribbons and gives them away.
const Ribbons = () => {
  const [shared, setShared] = useState(false)
  const rib = shared ? [1, 1, 1] : [3, 0, 0]
  return (
    <div className="rounded-2xl border border-amber-300/30 bg-amber-300/5 p-6 text-center">
      <p className="font-lore text-2xl italic">When you win on Mirabloom, you give your ribbons away.</p>
      <div className="mt-5 flex justify-center gap-8">
        {['Winner', 'Friend 1', 'Friend 2'].map((n, i) => (
          <div key={n} className="flex flex-col items-center gap-2">
            <div className="flex h-16 items-end gap-1">{Array.from({ length: rib[i] }, (_, k) => <span key={k} className="h-12 w-4 animate-[rise-in_.5s_ease-out] rounded-b-full" style={{ background: ['#ffb347', '#f472b6', '#7dd3fc'][k % 3] }} />)}</div>
            <span className="text-xs uppercase tracking-widest text-mist">{n}</span>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setShared((s) => !s)} className="mt-5 rounded-full border border-amber-300 px-6 py-2 text-sm font-bold text-amber-200 hover:bg-white/10">{shared ? 'Start again' : 'Share the ribbons'}</button>
      <p className="mt-2 text-sm text-mist">{shared ? 'Now everybody has a ribbon, and everybody is smiling.' : 'The winner holds all three ribbons.'}</p>
    </div>
  )
}

const ArenaRealm = () => (
  <div className="space-y-8">
    <Stadium />
    <div><h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">The practice field · play all three games</h2><PlayGames /></div>
    <Ribbons />
  </div>
)

export default ArenaRealm
