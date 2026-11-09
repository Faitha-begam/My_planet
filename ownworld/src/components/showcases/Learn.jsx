import { useState } from 'react'
import { wagons } from '../../data/content'
import Scene from '../Scene'

// "Plan your Wagon Day": pick three wagons, then see the day and go to the Show-and-Share Fair.
export const WonderDay = () => {
  const [picks, setPicks] = useState([])
  const [going, setGoing] = useState(false)
  const [claps, setClaps] = useState(0)
  const toggle = (id) => { setGoing(false); setPicks((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length < 3 ? [...p, id] : p)) }
  const chosen = picks.map((id) => wagons.find((w) => w.id === id))
  const when = ['Morning', 'Afternoon', 'Late afternoon']
  return (
    <div className="rounded-2xl border border-teal-300/30 bg-teal-300/5 p-6">
      <p className="font-lore text-2xl italic">Plan your Wagon Day! Pick three wagons ({picks.length} of 3).</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {wagons.map((w) => (
          <button key={w.id} type="button" onClick={() => toggle(w.id)} aria-pressed={picks.includes(w.id)} className={`overflow-hidden rounded-2xl border text-left transition ${picks.includes(w.id) ? 'scale-[1.03]' : 'opacity-70 hover:opacity-100'}`} style={{ borderColor: picks.includes(w.id) ? w.c : '#ffffff22', boxShadow: picks.includes(w.id) ? `0 0 24px ${w.c}66` : 'none' }}>
            <Scene id={w.scene} color={w.c} className="h-24 w-full" />
            <span className="block p-2 text-sm font-bold">{w.n}</span>
          </button>
        ))}
      </div>
      <button type="button" disabled={picks.length < 3} onClick={() => setGoing(true)} className="mt-4 rounded-full border border-teal-300 px-6 py-2 text-sm font-bold text-teal-200 enabled:hover:bg-white/10 disabled:opacity-40">Start my Wagon Day</button>
      {going && (
        <div className="mt-5 animate-[rise-in_.5s_ease-out] space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            {chosen.map((w, i) => (
              <div key={w.id} className="overflow-hidden rounded-2xl border" style={{ borderColor: `${w.c}66` }}>
                <Scene id={w.scene} color={w.c} className="h-28 w-full" />
                <div className="p-3"><p className="text-xs uppercase tracking-widest" style={{ color: w.c }}>{when[i]}</p><p className="font-bold">{w.n}</p><p className="font-lore text-base italic text-mist">You learn {w.learn}: you {w.does[0]}, then {w.does[1]}.</p></div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-amber-300/40 bg-amber-300/5 p-4 text-center">
            <p className="font-lore text-xl italic">The Show-and-Share Fair! There are no tests. You show a friend what you made, and they clap.</p>
            <button type="button" onClick={() => setClaps((c) => c + 1)} className="mt-3 rounded-full border border-amber-300 px-6 py-2 text-sm font-bold text-amber-200 hover:bg-white/10">Show my friend!</button>
            <p className="mt-2 text-sm text-mist">{claps === 0 ? 'Press the button to show them.' : `Your friend clapped ${claps} time${claps === 1 ? '' : 's'}. Clap clap!`}</p>
          </div>
        </div>
      )}
    </div>
  )
}
