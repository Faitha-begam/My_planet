import { Link } from 'react-router-dom'
import Scene from './Scene'
import { journey, realmById } from '../data/story'

// "Where can I go next?" Always answered, at the foot of every realm.
const RealmNav = ({ id }) => {
  const next = realmById[journey[(journey.indexOf(id) + 1) % journey.length]]
  return (
    <footer className="mx-auto mt-14 max-w-6xl px-4 pb-24 sm:px-8">
      <Link to={`/realms/${next.id}`} className="group relative block overflow-hidden rounded-3xl border" style={{ borderColor: `${next.color}66` }}>
        <Scene id={next.scene} color={next.color} className="h-40 w-full transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-abyss/90 to-transparent p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-mist/70">Hop on to the next realm</p>
          <p className="text-3xl font-extrabold uppercase sm:text-4xl" style={{ color: next.color }}>{next.name} →</p>
        </div>
      </Link>
      <div className="mt-6 flex flex-wrap gap-2" aria-label="All realms">
        {journey.map((rid) => {
          const r = realmById[rid]
          return <Link key={rid} to={`/realms/${rid}`} aria-current={rid === id ? 'page' : undefined} className={`rounded-full border px-3 py-1 text-xs transition hover:bg-white/10 ${rid === id ? 'bg-white/15 text-white' : 'text-mist/70'}`} style={{ borderColor: `${r.color}88` }}>{r.short}</Link>
        })}
      </div>
    </footer>
  )
}

export default RealmNav
