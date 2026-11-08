// The planet's name sinks into the fog and only surfaces where your light touches it.
const GlowTitle = ({ word }) => (
  <h1 aria-label={word} className="pointer-events-none flex select-none font-display font-extrabold leading-none tracking-tight">
    {[...word].map((letter, i) => (
      <span
        key={i}
        data-glow
        aria-hidden="true"
        className="text-[clamp(3rem,15vw,11rem)]"
        style={{
          opacity: 'calc(0.12 + var(--glow, 0) * 0.88)',
          color: '#ffe3b0',
          textShadow: '0 0 calc(var(--glow, 0) * 40px) #ffb347',
          transform: `translateY(${(i % 2 ? 1 : -1) * 6}px)`,
        }}
      >
        {letter}
      </span>
    ))}
  </h1>
)

export default GlowTitle
