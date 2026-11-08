// A CSS/SVG-generated landscape: three ridge layers that slide with your light.
const ridge = (seed, amp, base) => {
  let d = `M0 ${base}`
  for (let x = 0; x <= 600; x += 30) d += `L${x} ${(base - amp * (0.5 + 0.5 * Math.sin(x * 0.013 + seed) + 0.4 * Math.sin(x * 0.031 + seed * 2.1))).toFixed(1)}`
  return `${d}L600 200L0 200Z`
}

const layers = [
  { amp: 46, base: 120, par: -0.01, fill: 0.3, off: 0 },
  { amp: 52, base: 148, par: -0.025, fill: 1, off: 3 },
  { amp: 30, base: 178, par: -0.05, fill: 1, off: 7 },
]

const Panorama = ({ color, seed = 1, children }) => (
  <div className="relative h-[68vh] min-h-[26rem] overflow-hidden rounded-3xl border border-white/10" style={{ background: `linear-gradient(#050a24, ${color}40 72%, #0a1238)` }}>
    <span className="fl absolute right-[14%] top-[10%] size-16 rounded-full" style={{ background: `radial-gradient(circle,#fff,${color} 45%,transparent 70%)`, boxShadow: `0 0 80px ${color}` }} />
    {layers.map((l, i) => (
      <svg key={i} viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true" className="absolute bottom-0 left-[-5%] h-full w-[110%]"
        style={{ transform: `translateX(calc((var(--lx, 50vw) - 50vw) * ${l.par}))` }}>
        <path d={ridge(seed + l.off, l.amp, l.base)} fill={i === 0 ? color : i === 1 ? '#0a1238' : '#050a24'} fillOpacity={l.fill} />
      </svg>
    ))}
    {children}
  </div>
)

export default Panorama
