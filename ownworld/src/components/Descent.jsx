import { useEffect } from 'react'

const captions = ['Entering the atmosphere…', 'The sky here is water.', 'Lanterns. Thousands, below you.', 'Welcome to Thalune.']

// The fall: black space, streaking stars, cloud, then a sea of lights rising to meet you.
const Descent = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 13500)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div className="fixed inset-0 z-40 overflow-hidden" style={{ animation: 'descent-bg 13s linear forwards' }}>
      <div className="absolute inset-0" style={{ animation: 'fadeout 13s linear forwards' }}>
        {Array.from({ length: 46 }, (_, i) => (
          <span key={i} className="absolute h-16 w-px bg-white" style={{ left: `${(i * 37) % 100}%`, animation: `streak ${0.9 + (i % 5) * 0.3}s linear ${(i % 9) * 0.2}s infinite` }} />
        ))}
      </div>
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className="absolute h-40 w-[60vw] rounded-full bg-white/25 blur-3xl" style={{ left: `${(i * 23) % 70}%`, top: 0, animation: `cloudup 5s ease-in ${4 + i * 0.5}s both` }} />
      ))}
      {Array.from({ length: 30 }, (_, i) => (
        <span key={i} className="absolute bottom-0 size-2 rounded-full bg-amber-200" style={{ left: `${(i * 31) % 100}%`, boxShadow: '0 0 14px #ffb347', animation: `rise ${5 + (i % 4)}s linear ${8 + (i % 8) * 0.4}s infinite both` }} />
      ))}
      <div className="absolute inset-0 grid place-items-center px-8 text-center">
        {captions.map((c, i) => (
          <p key={c} className="col-start-1 row-start-1 max-w-xl font-lore text-3xl italic text-white opacity-0 sm:text-5xl" style={{ animation: `line 3.4s ease-in-out ${i * 3.3}s both` }}>{c}</p>
        ))}
      </div>
      <button type="button" onClick={onDone} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/50 hover:text-white">Skip the descent</button>
    </div>
  )
}

export default Descent
