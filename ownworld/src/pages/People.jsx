import { useState } from 'react'
import { Link } from 'react-router-dom'
import Character from '../components/Character'
import PageHeader from '../components/PageHeader'
import { people, realmById } from '../data/story'

// Ten inhabitants around one fire. Each is a guide to a realm.
const People = () => {
  const [i, setI] = useState(0)
  const p = people[i]
  const r = realmById[p.realm]
  return (
    <main>
      <PageHeader crumbs={[['Thalune', '/'], ['Chapter 4 · The People']]} eyebrow="Chapter 4 · The People" title="The ten Wickfolk"
        plain="Meet the people of Thalune. Each one lives in a different realm and will take you there." does={['Tap a person to hear them', 'Follow them into their realm']} color="#fda4af" />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="relative mx-auto aspect-square w-full max-w-2xl">
          <span className="tw absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle,#fff,#ffb347 40%,transparent 70%)', boxShadow: '0 0 90px #ffb347' }} />
          {people.map((q, k) => {
            const a = (k / people.length) * 6.283 - 1.5708
            return (
              <button key={q.id} type="button" onClick={() => setI(k)} aria-pressed={k === i} aria-label={`${q.name}, ${q.role}`} className="absolute -translate-x-1/2 -translate-y-1/2 text-center transition hover:scale-110"
                style={{ left: `${50 + 40 * Math.cos(a)}%`, top: `${50 + 40 * Math.sin(a)}%`, opacity: k === i ? 1 : 0.65, filter: k === i ? `drop-shadow(0 0 16px ${q.color})` : 'none' }}>
                <Character kind={q.kind} color={q.color} className="mx-auto h-20 sm:h-28" />
                <span className="block text-[0.65rem] font-bold sm:text-xs">{q.name.split(' ')[0]}</span>
              </button>
            )
          })}
        </div>
        <article key={p.id} className="mx-auto mt-6 flex max-w-3xl animate-[rise-in_.5s_ease-out] flex-col items-center gap-5 rounded-3xl border bg-deep/60 p-6 sm:flex-row" style={{ borderColor: `${p.color}66` }}>
          <Character kind={p.kind} color={p.color} className="h-48" />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: p.color }}>{p.role}</p>
            <h2 className="text-3xl font-extrabold">{p.name}</h2>
            <p className="mt-2 font-lore text-2xl italic">“{p.quote}”</p>
            <Link to={`/realms/${r.id}`} className="mt-4 inline-block rounded-full border px-5 py-2 text-sm hover:bg-white/10" style={{ borderColor: p.color, color: p.color }}>Follow {p.name.split(' ')[0]} into {r.name} →</Link>
          </div>
        </article>
      </section>
    </main>
  )
}

export default People
