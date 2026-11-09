import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Scene from '../components/Scene'

const eras = [
  { n: 'I', t: 'The Long Sleep', scene: 'abyss', c: '#818cf8', cap: 'Long, long ago, the planet slept under a thick, soft fog.', relic: 'A very old, very big pillow' },
  { n: 'II', t: 'The Sky-Whale Visit', scene: 'transport', c: '#7dd3fc', cap: 'One day, a friendly sky-whale found the planet and sang to it.', relic: 'A whale tooth that hums a tune' },
  { n: 'III', t: 'The First Flower', scene: 'nature', c: '#34d399', cap: 'The planet woke up and grew its very first giant glowing flower.', relic: 'The first seed, still in a jar' },
  { n: 'IV', t: 'The Three Kind Rules', scene: 'laws', c: '#5eead4', cap: 'The first people moved in and made three rules: be kind, fix what you break, tell the truth.', relic: 'The rule stones, with wobbly writing' },
  { n: 'V', t: 'The Hello Signal', scene: 'communication', c: '#f9a8d4', cap: 'Every night they lit their flowers to say hello to the stars. Then one night… somebody heard. That was you!', relic: 'The hello beacon. It points right at you.' },
]

const Origins = () => {
  const [open, setOpen] = useState(null)
  return (
    <main>
      <PageHeader crumbs={[['Mirabloom', '/'], ['Chapter 1 · Origins']]} eyebrow="Chapter 1 · Origins" title="How Mirabloom began"
        plain="The story of how a sleepy planet woke up, told in five pictures. Scroll down to see it." does={['Scroll through 5 pictures', 'Touch the old treasures']} color="#818cf8" />
      <div className="mt-8">
        {eras.map((e, i) => (
          <section key={e.n} className="relative flex min-h-[80vh] items-center overflow-hidden">
            <Scene id={e.scene} color={e.c} className="absolute inset-0 h-full w-full scale-110" />
            <div className="absolute inset-0 bg-gradient-to-r from-abyss/90 via-abyss/30 to-abyss/80" />
            <Reveal className={`relative mx-auto flex w-full max-w-6xl px-4 sm:px-8 ${i % 2 ? 'justify-end text-right' : ''}`}>
              <div className="max-w-xl">
                <p className="text-[clamp(4rem,14vw,9rem)] font-extrabold leading-none opacity-30" style={{ color: e.c }}>{e.n}</p>
                <h2 className="-mt-6 text-3xl font-extrabold uppercase sm:text-5xl">{e.t}</h2>
                <p className="mt-3 font-lore text-2xl italic text-white/90">{e.cap}</p>
                <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="mt-5 rounded-full border px-5 py-2 text-sm hover:bg-white/10" style={{ borderColor: e.c, color: e.c }}>{open === i ? e.relic : 'Touch the old treasure'}</button>
              </div>
            </Reveal>
          </section>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-8">
        <Link to="/world" className="group inline-block">
          <span className="block text-[clamp(1.8rem,6vw,4rem)] font-extrabold uppercase text-white/30 transition group-hover:text-wick">Chapter 2 · See the whole world →</span>
        </Link>
      </div>
    </main>
  )
}

export default Origins
