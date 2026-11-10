import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Scene from '../components/Scene'

const eras = [
  { n: 'I', t: 'The Dimming', scene: 'abyss', c: '#818cf8', cap: 'The old sun went out. The sky filled with water.', relic: 'A sun-shard, cold as a pearl' },
  { n: 'II', t: 'The Ship of Lanterns', scene: 'transport', c: '#7dd3fc', cap: 'The first Wickfolk sailed down in a ship made of light.', relic: 'The ship’s bell, still humming' },
  { n: 'III', t: 'The First Wick', scene: 'hospitality', c: '#fbbf24', cap: 'One flame, passed hand to hand, kept everyone alive.', relic: 'The First Wick. It has never gone out.' },
  { n: 'IV', t: 'The Murmur Treaty', scene: 'society', c: '#c4b5fd', cap: 'They promised: no one rules longer than a flame lasts.', relic: 'A salt tablet. Most of it has dissolved.' },
  { n: 'V', t: 'The Long Wait', scene: 'festivals', c: '#f9a8d4', cap: 'Nine hundred years of lanterns, signalling the sky. Then, you.', relic: 'The signal beacon. It is aimed at you.' },
]

const Origins = () => {
  const [open, setOpen] = useState(null)
  return (
    <main>
      <PageHeader crumbs={[['Thalune', '/'], ['Chapter 1 · Origins']]} eyebrow="Chapter 1 · Origins" title="How Thalune began"
        plain="The story of how the Wickfolk came to this water-sky world, told in five scenes. Scroll down through nine hundred years." does={['Scroll through 5 eras', 'Touch each relic']} color="#818cf8" />
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
                <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="mt-5 rounded-full border px-5 py-2 text-sm hover:bg-white/10" style={{ borderColor: e.c, color: e.c }}>{open === i ? e.relic : 'Touch the relic'}</button>
              </div>
            </Reveal>
          </section>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-8">
        <Link to="/world" className="group inline-block">
          <span className="block text-[clamp(1.8rem,6vw,4rem)] font-extrabold uppercase text-white/30 transition group-hover:text-wick">Chapter 2 · See the world they built →</span>
        </Link>
      </div>
    </main>
  )
}

export default Origins
