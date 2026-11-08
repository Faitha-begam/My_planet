import { Link, useParams } from 'react-router-dom'
import { Crumbs } from '../components/PageHeader'
import Scene from '../components/Scene'
import Showcase from '../components/Showcase'
import { Choices, HowItWorks } from '../components/showcases/Systems'
import { deptById, departments } from '../data/world'
import { realmOf } from '../data/story'
import NotFound from './NotFound'

const Department = () => {
  const { id } = useParams()
  const d = deptById[id]
  if (!d) return <NotFound />
  const realm = realmOf[d.id]
  const i = departments.indexOf(d)
  const prev = departments[(i + departments.length - 1) % departments.length]
  const next = departments[(i + 1) % departments.length]
  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-20 sm:px-8">
      <div className="mb-4"><Crumbs crumbs={[['Thalune', '/'], ['Realms', '/realms'], [realm.name, `/realms/${realm.id}`], [d.label]]} /></div>
      <section className="relative overflow-hidden rounded-3xl border" style={{ borderColor: `${d.color}55` }}>
        <Scene id={d.scene} color={d.color} className="h-[44vh] w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/10 to-transparent" />
        {d.facts.map((f, k) => (
          <span key={f} className="fl absolute hidden rounded-full border border-white/30 bg-abyss/60 px-4 py-1.5 font-lore text-sm italic backdrop-blur-sm sm:block"
            style={{ right: `${[6, 18, 4][k]}%`, top: `${[14, 40, 66][k]}%`, animationDelay: `${k * 0.9}s` }}>{f}</span>
        ))}
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: d.color }}>{d.label}</p>
          <h1 className="text-[clamp(2rem,7vw,4.5rem)] font-extrabold leading-none">{d.name}</h1>
          <p className="mt-2 font-lore text-xl italic text-mist">{d.line}</p>
        </div>
      </section>
      <div className="mt-6"><Showcase d={d} /></div>
      <HowItWorks d={d} />
      <Choices d={d} />
      <h2 className="mt-12 text-xs uppercase tracking-[0.3em] text-mist/60">Connected to</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {d.related.map((r) => (
          <Link key={r} to={`/sector/${r}`} className="rounded-full border px-4 py-2 text-sm hover:bg-white/10" style={{ borderColor: `${deptById[r].color}88`, color: deptById[r].color }}>{deptById[r].name}</Link>
        ))}
      </div>
      <div className="mt-10 flex justify-between text-sm text-mist">
        <Link to={`/sector/${prev.id}`} className="hover:text-white">← {prev.label}</Link>
        <Link to="/realms" className="hover:text-white">All realms</Link>
        <Link to={`/sector/${next.id}`} className="hover:text-white">{next.label} →</Link>
      </div>
    </main>
  )
}

export default Department
