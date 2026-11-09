import { useState } from 'react'
import { VoteBooth } from './Civic'

const problems = [
  { q: 'A big puddle is blocking the road!', fixes: [['Build a tiny bridge', 'Splash! The bridge is wobbly and fun.', 2], ['Turn it into a splash park', 'Everyone cheers! Best idea ever.', 3], ['Ask everyone for ideas', 'Ten kids bring buckets and scoop it up!', 2]] },
  { q: 'A rooster crows at 3 in the morning!', fixes: [['Sing it a bedtime song', 'It sleeps till breakfast. Zzz.', 3], ['Move its coop far away', 'Now the cows can’t sleep. Oh dear.', 1], ['Give it a little drum', 'Now it plays at 3 a.m. Oh no!', 0]] },
  { q: 'Two kids both want the same swing!', fixes: [['Take turns, count to ten', 'Fair! Both of them are happy.', 3], ['Build a swing for two', 'Wheee, together!', 3], ['Put the swing away', 'Nobody is happy.', 0]] },
]

// Be the Big Hat wearer: pick a problem, pick a fix, and watch how happy the village is.
export const HatCouncil = () => {
  const [pi, setPi] = useState(0)
  const [done, setDone] = useState({})
  const p = problems[pi]
  const score = Object.values(done).reduce((a, [, h]) => a + h, 0)
  return (
    <div className="rounded-2xl border border-sky-300/30 bg-sky-300/5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-lore text-xl italic text-sky-100">You are wearing the Big Hat! Solve the village’s problems.</p>
        <p className="text-sm text-mist">Village happiness: {'♥'.repeat(score) || '–'}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {problems.map((x, i) => <button key={x.q} type="button" onClick={() => setPi(i)} aria-pressed={i === pi} className={`rounded-full border px-4 py-1.5 text-sm ${i === pi ? 'border-sky-300 bg-sky-300/20' : 'border-white/20 text-mist'}`}>Problem {i + 1}{done[i] ? ' ✓' : ''}</button>)}
      </div>
      <p className="mt-4 text-2xl font-extrabold">{p.q}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.fixes.map(([label, res, h]) => <button key={label} type="button" onClick={() => setDone((d) => ({ ...d, [pi]: [res, h] }))} className="rounded-full border border-sky-300 px-4 py-2 text-sm text-sky-200 hover:bg-white/10">{label}</button>)}
      </div>
      {done[pi] && <p key={`${pi}${done[pi][0]}`} className="mt-4 animate-[rise-in_.4s_ease-out] font-lore text-xl">{done[pi][0]} <span className="text-pink-300">{'♥'.repeat(done[pi][1]) || 'No hearts this time.'}</span></p>}
    </div>
  )
}

const rules = [['Be kind', 'Share the swing. Say thank you.'], ['Fix what you break', 'Broke a cup? Glue it together. Broke a promise? Make it right.'], ['Tell the truth', 'Even when it’s hard: “I ate the last cookie.” The truth is brave.']]

// The Three Kind Rules, plus the Make-It-Right Table where mix-ups get mended.
export const KindRules = () => {
  const [open, setOpen] = useState(null)
  return (
    <div className="rounded-2xl border border-teal-300/30 bg-teal-300/5 p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {rules.map(([t, ex], i) => (
          <button key={t} type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="rounded-2xl border border-teal-300/40 p-5 text-left transition hover:bg-white/5">
            <p className="text-4xl font-extrabold text-teal-300">{i + 1}</p><p className="text-xl font-extrabold">{t}</p>
            <p className="mt-2 font-lore text-lg italic text-mist">{open === i ? ex : 'Tap to see an example'}</p>
          </button>
        ))}
      </div>
      <p className="mt-5 font-lore text-xl italic">If someone breaks a rule, they don’t get in trouble. Both people sit at the <span className="text-teal-200">Make-It-Right Table</span> and make something together, like a picture or a pie. Then it’s all mended.</p>
    </div>
  )
}

export const HatShow = () => (
  <div className="space-y-6">
    <HatCouncil />
    <div><h3 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">Everyone helps decide: cast a pebble</h3><VoteBooth /></div>
  </div>
)
