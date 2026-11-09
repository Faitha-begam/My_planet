import { Link } from 'react-router-dom'
import CivWeb from '../components/CivWeb'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Scene from '../components/Scene'
import { realms } from '../data/story'

// The hub: ten gates, each one a different place in the same civilization.
const Realms = () => (
  <main>
    <PageHeader crumbs={[['Mirabloom', '/'], ['Chapter 3 · The Realms']]} eyebrow="Chapter 3 · The Realms" title="Twelve places to explore"
      plain="Life on Mirabloom is split into twelve Realms. Each one is a place you can step into, with its own friends and its own things to try." does={['Pick a gate to step through', 'Every realm is different']} />
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-5">
      {realms.map((r, i) => (
        <Reveal key={r.id} delay={(i % 4) * 80} className={i % 2 ? 'lg:translate-y-8' : ''}>
          <Link to={`/realms/${r.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-2xl border transition duration-500 hover:-translate-y-2" style={{ borderColor: `${r.color}77`, boxShadow: `0 0 40px -20px ${r.color}` }}>
            <Scene id={r.scene} color={r.color} className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-center">
              <p className="text-xs font-extrabold tracking-[0.3em]" style={{ color: r.color }}>REALM {i + 1}</p>
              <p className="text-lg font-extrabold uppercase leading-tight">{r.name.replace('The ', '')}</p>
              <p className="mt-1 font-lore text-sm italic text-mist">{r.does[0]}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </section>
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-16 text-center sm:px-8">
      <h2 className="text-xs uppercase tracking-[0.3em] text-mist/60">How everything connects</h2>
      <p className="mx-auto mt-2 max-w-xl font-lore text-xl italic text-mist">Everything on Mirabloom is connected, like friends holding hands. Touch a dot to see who it’s friends with.</p>
      <div className="mt-4"><CivWeb /></div>
    </section>
  </main>
)

export default Realms
