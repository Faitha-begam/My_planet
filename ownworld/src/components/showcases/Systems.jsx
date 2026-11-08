import { Fragment, useEffect, useState } from 'react'
import Icon from '../Icon'

// "How it works": the department's invented system as a visual chain you can play.
export const HowItWorks = ({ d }) => {
  const [on, setOn] = useState(0)
  const [play, setPlay] = useState(false)
  const n = d.flow.length
  useEffect(() => {
    if (!play) return
    const t = setInterval(() => setOn((i) => (i + 1) % n), 1300)
    return () => clearInterval(t)
  }, [play, n])
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-[0.3em] text-mist/60">How it works</h2>
        <button type="button" onClick={() => setPlay((p) => !p)} className="rounded-full border border-white/30 px-4 py-1 text-xs hover:bg-white/10">{play ? 'Pause' : 'Play the system'}</button>
      </div>
      <div className="mt-5 flex flex-wrap items-start justify-center gap-x-1 gap-y-4 sm:flex-nowrap">
        {d.flow.map((node, i) => (
          <Fragment key={node.label}>
            <button type="button" aria-pressed={i === on} onClick={() => { setPlay(false); setOn(i) }} className="group flex w-24 flex-col items-center gap-2 text-center sm:w-36">
              <span className={`grid size-14 place-items-center rounded-full border-2 transition duration-500 ${i === on ? 'scale-125' : 'opacity-60 group-hover:opacity-100'}`}
                style={{ borderColor: d.color, color: d.color, boxShadow: i === on ? `0 0 30px ${d.color}` : 'none', background: i === on ? `${d.color}22` : 'transparent' }}>
                <Icon name={node.icon} />
              </span>
              <span className={`font-lore text-base italic leading-tight transition ${i === on ? 'text-white' : 'text-mist/70'}`}>{node.label}</span>
            </button>
            {i < n - 1 && <span className="mt-4 text-xl transition" style={{ color: i < on ? d.color : '#ffffff33' }} aria-hidden="true">→</span>}
          </Fragment>
        ))}
      </div>
    </section>
  )
}

// A small decision inside the system, with a consequence.
export const Choices = ({ d }) => {
  const [pick, setPick] = useState(null)
  const c = d.choice
  return (
    <section className="mt-10 rounded-2xl border p-6" style={{ borderColor: `${d.color}44`, background: `${d.color}0d` }}>
      <p className="font-lore text-2xl italic">{c.q}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {c.opts.map((o, i) => (
          <button key={o.a} type="button" onClick={() => setPick(i)} aria-pressed={pick === i}
            className={`rounded-full border px-4 py-2 text-sm transition ${pick === i ? 'bg-white/15 text-white' : 'text-mist hover:text-white'}`} style={{ borderColor: d.color }}>{o.a}</button>
        ))}
      </div>
      {pick !== null && <p key={pick} className="mt-4 animate-[rise-in_.5s_ease-out] font-lore text-xl" style={{ color: d.color }}>{c.opts[pick].b}</p>}
    </section>
  )
}
