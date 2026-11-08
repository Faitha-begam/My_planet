const particles = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 53) % 100,
  size: 2 + (i % 4),
  dur: 14 + ((i * 7) % 18),
  delay: -((i * 5) % 20),
  color: i % 3 === 0 ? '#ffb347' : '#3ff2d0',
}))

const Jelly = ({ left, scale, dur, delay, color }) => (
  <svg
    viewBox="0 0 60 100"
    aria-hidden="true"
    className="absolute bottom-0 w-24"
    style={{ left: `${left}%`, color, transform: `scale(${scale})`, animation: `rise ${dur}s linear ${delay}s infinite` }}
  >
    <path d="M5 40C5 10 55 10 55 40Q30 48 5 40Z" fill="currentColor" opacity=".3" />
    {[14, 24, 34, 44].map((x) => (
      <path key={x} d={`M${x} 42q-6 18 0 30t0 24`} stroke="currentColor" strokeWidth="1.2" fill="none" opacity=".3" />
    ))}
  </svg>
)

const Fog = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div className="absolute -left-1/4 top-1/4 size-[60vmax] rounded-full bg-indigo-700/25 blur-3xl animate-drift" />
    <div className="absolute -right-1/4 bottom-0 size-[50vmax] rounded-full bg-teal-500/10 blur-3xl animate-drift [animation-delay:-12s]" />
    <div className="absolute left-1/3 -top-1/4 size-[45vmax] rounded-full bg-violet-600/15 blur-3xl animate-drift [animation-delay:-22s]" />
    <Jelly left={12} scale={1.2} dur={70} delay={-10} color="#3ff2d0" />
    <Jelly left={58} scale={0.8} dur={90} delay={-50} color="#a78bfa" />
    <Jelly left={84} scale={1.6} dur={110} delay={-30} color="#ffb347" />
    {particles.map((p, i) => (
      <span
        key={i}
        className="absolute bottom-0 rounded-full"
        style={{
          left: `${p.left}%`, width: p.size, height: p.size, background: p.color,
          boxShadow: `0 0 8px ${p.color}`, animation: `rise ${p.dur}s linear ${p.delay}s infinite`,
        }}
      />
    ))}
  </div>
)

export default Fog
