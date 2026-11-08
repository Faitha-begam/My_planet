import { Link } from 'react-router-dom'
import CivWeb from '../components/CivWeb'
import Reveal from '../components/Reveal'
import Scene from '../components/Scene'
import { departments } from '../data/world'

// Every tile gets its own silhouette and size so the civilization doesn't read as one repeated card.
const shapes = [
  'sm:col-span-2 rounded-[2.5rem]', 'rounded-tl-[6rem] rounded-br-[6rem] rounded-2xl', 'rounded-full aspect-square', 'sm:row-span-2 rounded-t-[8rem] rounded-b-2xl',
  'sm:col-span-2 rounded-2xl', 'rounded-[3rem]', 'rounded-tr-[6rem] rounded-bl-[6rem] rounded-2xl', 'sm:col-span-2 rounded-full',
  'rounded-3xl', 'sm:row-span-2 rounded-[3rem]', 'rounded-b-[6rem] rounded-t-2xl', 'sm:col-span-2 rounded-tl-[5rem] rounded-2xl',
  'rounded-[2rem]', 'rounded-tl-[6rem] rounded-br-[6rem] rounded-2xl', 'rounded-3xl',
]

const Civilization = () => (
  <main className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-8">
    <h1 className="text-4xl font-extrabold sm:text-6xl">How Noctira lives</h1>
    <p className="mt-2 font-lore text-xl italic text-mist">Twenty-eight invented ways of living, all connected. Tap a light in the web, or pick a tile.</p>
    <div className="mt-6"><CivWeb /></div>
    <div className="mt-8 grid auto-rows-[11rem] gap-4 sm:grid-cols-3 sm:auto-rows-[13rem]">
      {departments.map((d, i) => (
        <Reveal key={d.id} className={shapes[i % shapes.length].split(' ').filter((c) => c.includes('span')).join(' ') || ''} delay={(i % 3) * 90}>
          <Link to={`/civilization/${d.id}`} aria-label={`${d.label}: ${d.name}`}
            className={`group relative block h-full w-full overflow-hidden border transition duration-500 hover:-translate-y-1 hover:scale-[1.02] ${shapes[i % shapes.length].split(' ').filter((c) => !c.includes('span')).join(' ')}`}
            style={{ borderColor: `${d.color}66`, boxShadow: `0 0 0 0 ${d.color}` }}>
            <Scene id={d.scene} color={d.color} className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-center">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.25em]" style={{ color: d.color }}>{d.label}</p>
              <p className="font-lore text-sm italic text-white/0 transition duration-500 group-hover:text-white/90 sm:text-base">{d.line}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  </main>
)

export default Civilization
