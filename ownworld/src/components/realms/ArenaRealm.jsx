import { useState } from 'react'
import Character from '../Character'
import { TideGames } from '../showcases/Games'

const ring = (n, rx, ry) => Array.from({ length: n }, (_, i) => [200 + rx * Math.cos((i / n) * 6.283), 112 + ry * Math.sin((i / n) * 6.283)])
const ticker = 'TIDE GAMES · LIVE TONIGHT · THE WESTERN DRIFT vs THE TEAL DEEP · SILENT APPLAUSE ONLY · '

// The stadium: a ringed arena full of lantern-holding spectators, with the athletes at the front.
const Stadium = () => (
  <div className="relative overflow-hidden rounded-3xl border border-rose-300/30 bg-gradient-to-b from-abyss to-rose-950/40">
    <div className="overflow-hidden whitespace-nowrap border-b border-rose-300/20 bg-rose-500/10 py-1.5 text-xs font-extrabold tracking-[0.3em] text-rose-200">
      <div className="inline-block" style={{ animation: 'marquee 30s linear infinite' }}>{ticker}{ticker}{ticker}{ticker}</div>
    </div>
    <svg viewBox="0 0 400 220" className="w-full" aria-hidden="true">
      {[[170, 88], [140, 70], [110, 54]].map(([rx, ry]) => <ellipse key={rx} cx="200" cy="112" rx={rx} ry={ry} fill="none" stroke="#ff7a8a" opacity=".3" />)}
      {[[170, 88, 30], [140, 70, 24], [110, 54, 18]].flatMap(([rx, ry, n], k) => ring(n, rx, ry).map(([x, y], i) => <circle key={`${k}${i}`} className="tw" cx={x} cy={y} r="3" fill={i % 3 ? '#ffb347' : '#ff7a8a'} style={{ animationDelay: `${((i * 7 + k) % 10) * 0.25}s` }} />))}
      <ellipse cx="200" cy="112" rx="78" ry="32" fill="#7dd3fc" opacity=".18" /><ellipse cx="200" cy="112" rx="50" ry="18" fill="#7dd3fc" opacity=".25" className="tw" />
    </svg>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-around px-6">
      <Character kind="oar" color="#7dd3fc" className="h-32 sm:h-44" /><Character kind="lamp" color="#ff7a8a" className="h-36 sm:h-52" /><Character kind="pole" color="#ffb347" className="h-32 sm:h-44" />
    </div>
  </div>
)

// The Glow Crowns: the winner's light is split among everyone who played.
const Crowning = () => {
  const [done, setDone] = useState(false)
  const v = done ? [50, 75, 65] : [100, 50, 30]
  return (
    <div className="rounded-2xl border border-amber-300/30 bg-amber-300/5 p-6">
      <p className="font-lore text-2xl italic">The Glow Crown ceremony: winners give half their light away.</p>
      <div className="mt-5 flex items-end justify-center gap-6">
        {['Winner', 'Second', 'Third'].map((n, i) => (
          <div key={n} className="flex flex-col items-center gap-2">
            <div className="flex h-32 items-end"><div className="w-12 rounded-t-full transition-all duration-1000" style={{ height: `${v[i]}%`, background: 'linear-gradient(#ffb347,transparent)', boxShadow: '0 0 24px #ffb347' }} /></div>
            <span className="text-xs uppercase tracking-widest text-mist">{n}</span>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setDone((d) => !d)} className="mx-auto mt-5 block rounded-full border border-amber-300 px-6 py-2 text-sm text-amber-200 hover:bg-white/10">{done ? 'Hold the ceremony again' : 'Crown the winner'}</button>
    </div>
  )
}

const ArenaRealm = () => (
  <div className="space-y-8">
    <Stadium />
    <div><h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">The practice pit · play the three sports</h2><TideGames /></div>
    <Crowning />
  </div>
)

export default ArenaRealm
