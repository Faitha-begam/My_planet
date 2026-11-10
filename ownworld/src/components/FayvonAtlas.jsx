import { Link } from 'react-router-dom'

const atlasStops = [
  ['education', 'Luma Seed Archive', 17, 25], ['sports', 'Cloudwake', 34, 18], ['transport', 'The Veilwater', 54, 25],
  ['entertainment', 'Dreammist Reach', 78, 31], ['government', 'The Chord Pool', 49, 52], ['food', 'Rainroot Gardens', 23, 62],
  ['healthcare', 'The Quiet Bloom', 72, 71], ['culture', 'Skybraid', 86, 51], ['technology', 'Bellspine', 38, 79], ['relationships', 'Ribbon Walk', 56, 89],
]

const FayvonAtlas = () => (
  <div className="atlas-map" aria-label="Interactive map of ten known FAYVON regions">
    <svg className="atlas-map-lines" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
      <path className="map-current map-current-main" d="M-20 315 C80 260 120 190 240 212 S370 340 478 308 580 120 700 166 816 315 1020 212" />
      <path className="map-current" d="M170 155 C246 240 222 365 250 460 S390 488 390 540" />
      <path className="map-current" d="M498 302 C621 334 640 414 714 456 S830 466 896 312" />
      <path className="map-contour" d="M44 85 Q170 30 296 86 T540 93 778 72 980 121" />
      <path className="map-contour" d="M-3 509 Q133 460 263 511 T510 513 750 493 1010 542" />
      <path className="map-contour" d="M347 0 Q308 122 358 204 T334 382 381 620" />
      <path className="map-contour" d="M653 0 Q714 115 670 220 T716 410 654 620" />
      <circle cx="506" cy="304" r="148" className="map-tide-ring" />
      <circle cx="506" cy="304" r="174" className="map-tide-ring map-tide-ring-outer" />
    </svg>
    <div className="atlas-map-label">KNOWN CURRENTS <span>·</span> 10 PLACES</div>
    {atlasStops.map(([id, name, x, y], i) => (
      <Link key={id} to={`/${id}`} className="atlas-stop" style={{ '--x': `${x}%`, '--y': `${y}%`, '--stop-delay': `${i * 90}ms` }}>
        <span className="atlas-stop-mark"><i /></span><span className="atlas-stop-name">{name}</span>
      </Link>
    ))}
    <div className="atlas-map-note">Tap a light to enter that place</div>
  </div>
)

export default FayvonAtlas
