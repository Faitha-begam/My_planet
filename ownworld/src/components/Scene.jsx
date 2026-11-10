// Hand-drawn SVG illustrations for every department and destination.
const W = '#cfd8ff'
const N = '#16206a'
const ring = (n, rx, ry, cx = 100, cy = 70) =>
  Array.from({ length: n }, (_, i) => [cx + rx * Math.cos((i / n) * 6.283), cy + ry * Math.sin((i / n) * 6.283)])

const scenes = {
  education: (c) => (<>
    <path d="M30 118V62l14-18 14 18v56zM78 118V50l16-22 16 22v68zM130 118V70l12-14 12 14v48z" fill={N} />
    <g fill={c} className="tw"><rect x="40" y="76" width="8" height="12" /><rect x="88" y="62" width="10" height="14" /><rect x="88" y="88" width="10" height="14" /><rect x="138" y="82" width="8" height="12" /></g>
    {[0, 1, 2, 3, 4].map((i) => (<g key={i} className="fl" style={{ animationDelay: `${i * 0.4}s` }}><circle cx={40 + i * 30} cy="125" r="4" fill={W} /><circle cx={40 + i * 30} cy="116" r="3" fill={c} /></g>))}
  </>),
  gaming: (c) => (<>
    <rect x="70" y="30" width="60" height="90" rx="8" fill={N} /><rect x="78" y="40" width="44" height="34" rx="4" fill="#050a24" />
    <g fill={c}><circle className="fl" cx="92" cy="56" r="5" /><circle className="fl" style={{ animationDelay: '1s' }} cx="110" cy="52" r="4" /></g>
    <rect x="82" y="86" width="36" height="8" rx="4" fill={c} opacity=".5" /><circle cx="90" cy="106" r="5" fill="#ff7a8a" /><circle cx="110" cy="106" r="5" fill="#3ff2d0" />
    <circle className="fl" cx="40" cy="44" r="6" fill={c} opacity=".8" /><circle className="fl" style={{ animationDelay: '2s' }} cx="162" cy="66" r="5" fill="#ffb347" />
  </>),
  cinema: (c) => (<>
    <path d="M24 98L112 62V82Z" fill="#ffe3b0" opacity=".25" /><rect x="112" y="28" width="70" height="62" rx="4" fill={c} opacity=".4" className="tw" />
    <g className="sp"><circle cx="42" cy="96" r="15" fill="none" stroke={W} strokeWidth="3" /><circle cx="42" cy="96" r="4" fill={W} /><circle cx="42" cy="85" r="3" fill={W} /><circle cx="42" cy="107" r="3" fill={W} /></g>
    {[120, 140, 160].map((x) => <circle key={x} cx={x} cy="118" r="6" fill="#050a24" />)}
  </>),
  food: (c) => (<>
    <path d="M45 84h110a55 38 0 0 1-110 0z" fill={N} /><ellipse cx="100" cy="84" rx="55" ry="9" fill={c} />
    {[80, 100, 120].map((x, i) => <path key={x} className="fl" style={{ animationDelay: `${i * 0.7}s` }} d={`M${x} 72q-8-14 0-26t0-18`} stroke={W} fill="none" opacity=".55" strokeWidth="2" />)}
    <circle cx="70" cy="84" r="3" fill="#fff" className="tw" /><circle cx="130" cy="86" r="2.5" fill="#fff" className="tw" />
  </>),
  society: (c) => (<>
    {[22, 38, 54].map((r) => <circle key={r} cx="100" cy="70" r={r} fill="none" stroke={c} opacity=".45" strokeDasharray="4 5" className="tw" />)}
    {ring(8, 38, 38).map(([x, y], i) => <g key={i} className="fl" style={{ animationDelay: `${i * 0.3}s` }}><circle cx={x} cy={y} r="6" fill={W} /><circle cx={x} cy={y - 9} r="3" fill={c} /></g>)}
    <circle cx="100" cy="70" r="7" fill={c} className="tw" />
  </>),
  government: (c) => (<>
    <ellipse cx="100" cy="98" rx="72" ry="16" fill="none" stroke={c} opacity=".4" />
    {ring(9, 72, 16, 100, 98).map(([x, y], i) => <path key={i} d={`M${x - 7} ${y}q7 9 14 0z`} fill={W} />)}
    <rect x="98" y="34" width="4" height="58" fill={N} /><circle cx="100" cy="30" r="11" fill={c} className="tw" />
  </>),
  laws: (c) => (<>
    {[26, 54, 82, 110, 138].map((x, i) => <g key={x}><rect x={x} y={44 + (i % 2) * 8} width="26" height="62" rx="5" fill={N} stroke={W} opacity={1 - i * 0.12} />{[0, 1, 2].map((l) => <rect key={l} x={x + 5} y={56 + (i % 2) * 8 + l * 10} width="16" height="2" fill={c} />)}</g>)}
    <rect x="166" y="52" width="26" height="62" rx="5" fill="none" stroke={c} strokeDasharray="3 3" className="tw" />
  </>),
  'daily-life': (c) => (<>
    <circle cx="100" cy="68" r="50" fill={N} stroke={c} strokeWidth="2" />
    {Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * 6.283 - 1.57; return <line key={i} x1={100 + 40 * Math.cos(a)} y1={68 + 40 * Math.sin(a)} x2={100 + 48 * Math.cos(a)} y2={68 + 48 * Math.sin(a)} stroke={c} strokeWidth="3" /> })}
    <line className="sp" x1="100" y1="68" x2="100" y2="30" stroke={W} strokeWidth="3" strokeLinecap="round" /><circle cx="100" cy="68" r="5" fill={c} />
  </>),
  work: (c) => (<>
    <rect x="96" y="34" width="6" height="86" fill={N} /><circle cx="99" cy="30" r="11" fill={c} className="tw" />
    <path d="M132 70q0-22 15-22t15 22z" fill={W} className="fl" /><rect x="144" y="70" width="6" height="8" fill={c} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={30 + i * 10} y={118 - i * 10} width="10" height={10 + i * 10} fill={N} />)}
  </>),
  healthcare: (c) => (<>
    {[40, 70, 130, 160].map((x, i) => <path key={x} d={`M${x} 124q${i % 2 ? -14 : 14}-30 0-50t${i % 2 ? 10 : -10}-24`} stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" opacity=".7" className="fl" style={{ animationDelay: `${i * 0.5}s` }} />)}
    <circle cx="100" cy="76" r="22" fill={c} opacity=".25" className="tw" /><circle cx="100" cy="76" r="12" fill={c} className="tw" />
  </>),
  hospitality: (c) => (<>
    <path d="M52 120V76l48-34 48 34v44z" fill={N} /><rect x="90" y="86" width="20" height="26" rx="2" fill={c} className="tw" />
    <rect x="62" y="88" width="14" height="16" fill={c} opacity=".6" className="tw" /><rect x="124" y="88" width="14" height="16" fill={c} opacity=".6" className="tw" />
    <rect x="156" y="84" width="6" height="30" fill={W} /><circle cx="159" cy="78" r="6" fill={c} className="fl" />
  </>),
  tourism: (c) => (<>
    <path d="M14 122Q14 38 100 38T186 122z" fill={N} /><path d="M58 122Q58 72 100 72T142 122z" fill="#050a24" />
    <circle cx="150" cy="34" r="13" fill={c} className="fl" />
    <path d="M86 114h28l-5 8H91z" fill={W} /><path d="M100 96v18l12-4z" fill={c} />
  </>),
  transport: (c) => (<>
    <path d="M30 66Q100 14 170 66Q100 54 30 66z" fill={c} opacity=".75" className="fl" /><path d="M100 60q0 30-10 50" stroke={c} fill="none" />
    <path d="M82 100h36l-7 11H89z" fill={W} />
    {[110, 122].map((y) => <path key={y} d={`M0 ${y}q50-14 100 0t100 0`} stroke={c} fill="none" opacity=".45" />)}
  </>),
  festivals: (c) => (<>
    {Array.from({ length: 14 }, (_, i) => <g key={i} className="fl" style={{ animationDelay: `${(i % 5) * 0.6}s` }}><rect x={14 + i * 13} y={30 + ((i * 37) % 80)} width="7" height="10" rx="3" fill={i % 3 ? c : '#ffb347'} /><circle cx={17.5 + i * 13} cy={35 + ((i * 37) % 80)} r="9" fill={c} opacity=".15" /></g>)}
  </>),
  'economy-tech': (c) => (<>
    <g className="sp"><circle cx="78" cy="66" r="28" fill="none" stroke={c} strokeWidth="7" strokeDasharray="7 5" /><circle cx="78" cy="66" r="9" fill={W} /></g>
    <g className="spr"><circle cx="126" cy="88" r="20" fill="none" stroke={W} strokeWidth="6" strokeDasharray="6 5" /><circle cx="126" cy="88" r="6" fill={c} /></g>
    {[0, 1, 2, 3, 4].map((i) => <circle key={i} className="tw" cx={150 + i * 8} cy={40 + (i % 2) * 6} r="3" fill={c} />)}
  </>),
  music: (c) => (<>
    {[34, 54, 74, 94, 114, 134, 154].map((x, i) => <rect key={x} className="tw" style={{ animationDelay: `${i * 0.25}s` }} x={x} y={100 - (20 + ((i * 29) % 50))} width="12" height={20 + ((i * 29) % 50)} rx="6" fill={c} />)}
    <path d="M0 108q50-20 100 0t100 0" stroke={W} fill="none" opacity=".4" />
  </>),
  rest: (c) => (<>
    <circle cx="150" cy="38" r="18" fill={W} /><circle cx="160" cy="32" r="16" fill="#0a1238" />
    {[34, 76, 118].map((x, i) => <g key={x}><rect x={x} y="100" width="40" height="12" rx="6" fill={N} /><circle cx={x + 8} cy="96" r="6" fill={W} /><text className="tw" x={x + 22} y="88" fill={c} fontSize="10" style={{ animationDelay: `${i * 0.5}s` }}>z</text></g>)}
  </>),
  business: (c) => (<>
    {[26, 80, 134].map((x, i) => <g key={x} className="fl" style={{ animationDelay: `${i * 0.6}s` }}><path d={`M${x} 60h40l-6-22H${x + 6}z`} fill={c} opacity=".8" /><rect x={x + 4} y="60" width="32" height="26" fill={N} /><path d={`M${x - 4} 94h48l-8 10H${x + 4}z`} fill={W} /></g>)}
  </>),
  housing: (c) => (<>
    {[[40, 96, 120], [58, 74, 84], [76, 52, 48]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height="24" rx="12" fill={N} stroke={c} opacity=".9" />)}
    {[60, 90, 120, 100].map((x, i) => <circle key={i} className="tw" cx={x} cy={[108, 108, 108, 86][i]} r="3" fill={c} />)}
  </>),
  family: (c) => (<>
    {[78, 122].map((x, i) => <g key={x} className="fl" style={{ animationDelay: `${i}s` }}><rect x={x - 4} y="62" width="8" height="48" rx="3" fill={W} /><path d={`M${x} 40q-9 12 0 20 9-8 0-20z`} fill={c} /></g>)}
    <circle cx="100" cy="60" r="38" fill={c} opacity=".15" className="tw" />
  </>),
  fashion: (c) => (<>
    <path d="M100 24v14M88 40h24" stroke={W} fill="none" /><path d="M86 42q14-10 28 0l22 76H64z" fill={N} stroke={c} />
    {[70, 82, 94, 106, 118, 130].map((x, i) => <circle key={x} className="tw" style={{ animationDelay: `${i * 0.3}s` }} cx={x} cy="114" r="3" fill={c} />)}
  </>),
  science: (c) => (<>
    <polyline points="30,40 70,70 110,36 150,64 176,30" fill="none" stroke={c} opacity=".6" strokeDasharray="3 3" />
    {[[30, 40], [70, 70], [110, 36], [150, 64], [176, 30]].map(([x, y], i) => <circle key={i} className="tw" cx={x} cy={y} r="4" fill={W} style={{ animationDelay: `${i * 0.4}s` }} />)}
    <path className="fl" d="M80 108h40l-7 11H87z" fill={W} />
  </>),
  communication: (c) => (<>
    {[40, 100, 160].map((x, i) => <path key={x} className="fl" style={{ animationDelay: `${i * 0.5}s` }} d={`M${x - 14} ${60 + i * 8}q0-26 14-26t14 26z`} fill={c} opacity=".85" />)}
    <path d="M54 64q23-24 46 0M114 70q23-24 46 0" stroke={W} fill="none" opacity=".5" className="tw" />
  </>),
  awards: (c) => (<>
    <path d="M60 80l10-34 18 20 12-28 12 28 18-20 10 34z" fill={c} opacity=".9" /><circle cx="100" cy="64" r="5" fill="#fff" className="tw" />
    <circle className="fl" cx="46" cy="104" r="6" fill={c} /><circle className="fl" cx="154" cy="104" r="6" fill={c} />
  </>),
  history: (c) => (<>
    {[34, 52, 70, 88].map((y, i) => <path key={y} d={`M10 ${y}q30-10 60 0t60 0t60 0V${y + 14}H10z`} fill={i % 2 ? N : '#1b2a8a'} />)}
    <rect x="96" y="92" width="8" height="26" fill={W} /><path d="M100 76q-8 10 0 16 8-6 0-16z" fill={c} className="tw" />
  </>),
  safety: (c) => (<>
    <path d="M100 30L-10 10v40zM100 30l110-20v40z" fill={c} opacity=".15" className="tw" />
    <path d="M88 118l6-72h12l6 72z" fill={N} stroke={W} /><circle cx="100" cy="38" r="9" fill={c} className="tw" />
  </>),
  recreation: (c) => (<>
    <g className="fl"><ellipse cx="100" cy="62" rx="30" ry="22" fill={c} opacity=".5" /><circle cx="90" cy="58" r="3" fill="#050a24" /><circle cx="110" cy="58" r="3" fill="#050a24" /><path d="M92 70q8 6 16 0" stroke="#050a24" fill="none" /></g>
    {[[40, 40], [160, 50], [150, 100], [48, 96]].map(([x, y], i) => <circle key={i} className="fl" style={{ animationDelay: `${i * 0.7}s` }} cx={x} cy={y} r="5" fill={W} opacity=".7" />)}
  </>),
  city: (c) => (<>
    {[[20, 60], [44, 40], [70, 76], [96, 28], [124, 56], [150, 44], [174, 70]].map(([x, h], i) => <g key={i}><rect x={x} y={124 - h} width="22" height={h} fill={N} />{[0, 1, 2].map((r) => <rect key={r} className="tw" x={x + 6} y={124 - h + 8 + r * 14} width="4" height="6" fill={c} />)}</g>)}
    <circle cx="107" cy="22" r="6" fill={c} className="fl" />
  </>),
  nature: (c) => (<>
    {[30, 56, 84, 116, 146, 170].map((x, i) => <path key={x} d={`M${x} 126q-10-24 0-42t0-34`} stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" opacity=".75" className="fl" style={{ animationDelay: `${i * 0.5}s` }} />)}
    <path className="fl" d="M92 40a14 12 0 0 1 28 0z" fill={W} opacity=".7" />
  </>),
  abyss: () => (<>
    {[60, 44, 28].map((r, i) => <circle key={r} cx="100" cy="70" r={r} fill="#050a24" opacity={0.5 + i * 0.2} />)}
    <circle cx="100" cy="70" r="5" fill="#fff" className="tw" /><circle cx="100" cy="70" r="14" fill="#fff" opacity=".12" className="tw" />
  </>),
}

const Scene = ({ id, color = '#3ff2d0', className = '', style }) => (
  <svg style={style} viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
    <rect width="200" height="140" fill="#0a1238" />
    <circle cx="100" cy="62" r="76" fill={color} opacity=".16" />
    {(scenes[id] || scenes.abyss)(color)}
    <path d="M0 126Q50 116 100 126T200 126V140H0Z" fill="#050a24" opacity=".75" />
  </svg>
)

export default Scene
