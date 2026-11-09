import { useEffect, useState } from 'react'

// Populated illustrations: every scene shows Bloomfolk doing the thing the sector is about.
// If /images/<scene>.webp exists, that artwork is shown instead (see public/images/README.txt).
const W = '#cfd8ff'
const N = '#16206a'
const SK = ['#ffd9b8', '#e8b48a', '#c68a62', '#8d5a3b']
const COL = ['#f9a8d4', '#86efac', '#fbbf24', '#7dd3fc', '#c4b5fd', '#fb7185']
const cache = {}

const props = {
  ball: <circle r="3" fill="#ff7a8a" />, book: <rect x="-3" y="-3" width="7" height="6" rx="1" fill="#ffe3b0" />,
  bowl: <path d="M-4 -1h8a4 4 0 0 1-8 0z" fill="#ffb347" />, bell: <path d="M-3 2q0-6 3-6t3 6z" fill="#fbbf24" />,
  brush: <><path d="M0 4l5-8" stroke="#ffe3b0" /><circle cx="5" cy="-5" r="1.8" fill="#f472b6" /></>,
  flag: <><path d="M0 4v-12" stroke="#ffe3b0" /><path d="M0-8l7 2-7 3z" fill="#ff7a8a" /></>,
  kite: <><path d="M2-9l4 5-4 5-4-5z" fill="#a78bfa" /><path d="M2 1q-3 4 1 8" stroke={W} fill="none" /></>,
  drum: <ellipse rx="4" ry="3" fill="#fb7185" stroke={W} />, cake: <><rect x="-4" y="-2" width="8" height="5" fill="#f9a8d4" /><circle cy="-4" r="1" fill="#ffb347" /></>,
  cup: <path d="M-3-3h6l-1 6h-4z" fill={W} />, star: <path d="M0-4l1.200 2.800 3 .3-2.300 2 .7 3L0 2l-2.600 1.600.7-3-2.300-2 3-.3z" fill="#ffd166" />,
  seed: <circle r="2" fill="#86efac" />, net: <><path d="M0 4l5-10" stroke="#ffe3b0" /><circle cx="5" cy="-8" r="3" fill="none" stroke={W} /></>,
  flower: <><circle r="3" fill="#f9a8d4" /><circle r="1" fill="#ffd166" /></>, pebble: <circle r="2.200" fill="#9aa5ce" />,
  fork: <path d="M0 4v-8M-1.500-4v-3M1.500-4v-3" stroke={W} />,
}
const arms = { stand: 'M-4-10l-3 8M4-10l3 8', up: 'M-4-11l-5-9M4-11l5-9', hold: 'M-4-10l-3 6M4-10l9-3', wave: 'M-4-10l-3 8M4-11l6-8' }

const P = ({ x, y, c = '#f9a8d4', pose = 'stand', prop, s = 1.4, d = 0, flip }) => {
  const sit = pose === 'sit'
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})${pose === 'lie' ? ' rotate(-85)' : ''}`}>
      <g className="pb" style={{ animationDelay: `${d}s` }}>
        <path d={sit ? 'M-5 0q0-9 5-9t5 9z' : 'M-5 0q0-14 5-14t5 14z'} fill={c} />
        <circle cy={sit ? -13 : -18} r="4.500" fill={SK[Math.abs(Math.floor(x)) % 4]} />
        <path d={sit ? 'M-4.500-14q4.500-7 9 0z' : 'M-4.500-19q4.500-7 9 0z'} fill="#2b1f4a" />
        <path d={arms[sit ? 'stand' : pose] || arms.stand} stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
        {prop === 'hat' ? <path d="M-8-22h16l-4-9h-8z" fill="#fbbf24" /> : prop && <g transform={`translate(${pose === 'hold' ? 10 : 7} -9)`}>{props[prop]}</g>}
      </g>
    </g>
  )
}
const T = (x, y, s = 1) => `translate(${x} ${y}) scale(${s})`
const Flo = ({ x, y, c, s = 1 }) => (
  <g transform={T(x, y, s)}><rect x="-1.500" y="-34" width="3" height="34" fill="#1b5e4a" /><circle cy="-36" r="14" fill={c} opacity=".25" className="tw" />
    {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cy="-44" rx="4.500" ry="10" transform={`rotate(${a} 0 -36)`} fill={c} opacity=".85" />)}<circle cy="-36" r="4" fill="#ffd166" /></g>
)
const Hut = ({ x, y, c, s = 1 }) => (
  <g transform={T(x, y, s)}><path d="M-14 0v-12a14 14 0 0 1 28 0v12z" fill={N} stroke={c} strokeOpacity=".5" /><rect x="-4" y="-10" width="8" height="10" rx="4" fill={c} className="tw" /></g>
)
const Cloud = ({ x, y, s = 1, o = 0.35 }) => (
  <g transform={T(x, y, s)} opacity={o}><ellipse rx="16" ry="6" fill={W} /><ellipse cx="-8" cy="-3" rx="8" ry="6" fill={W} /><ellipse cx="6" cy="-4" rx="10" ry="7" fill={W} /></g>
)
const Tbl = ({ x, y, w = 40 }) => (
  <g><rect x={x - w / 2} y={y - 10} width={w} height="4" rx="2" fill="#ffe3b0" /><rect x={x - w / 2 + 3} y={y - 6} width="3" height={6} fill="#c9a66b" /><rect x={x + w / 2 - 6} y={y - 6} width="3" height={6} fill="#c9a66b" /></g>
)
const Whale = ({ x, y, s = 1, c }) => (
  <g transform={T(x, y, s)} className="fl"><path d="M-28 0q0-16 26-16t26 8l10-8v18l-10-6q-4 12-26 12-26 0-26-8z" fill={c} opacity=".85" /><circle cx="-16" cy="-8" r="2" fill="#050a24" /><path d="M-14-2q4 3 8 0" stroke="#050a24" fill="none" /></g>
)
const Heart = ({ x, y, c = '#fb7185' }) => <path className="tw" transform={`translate(${x} ${y})`} d="M0 0q-4-5-6-1t6 7q8-4 6-7t-6 1z" fill={c} />
const Awning = ({ x, y, c }) => <path d={`M${x - 20} ${y}h40l-6-14H${x - 14}z`} fill={c} opacity=".9" />

const scenes = {
  education: (c) => (<><Flo x="172" y="122" c={c} s=".8" /><rect x="58" y="90" width="52" height="26" rx="6" fill={c} opacity=".85" /><rect x="66" y="96" width="14" height="12" rx="3" fill="#0a1238" /><rect x="86" y="96" width="14" height="12" rx="3" fill="#0a1238" /><circle cx="70" cy="118" r="6" fill="#050a24" stroke={W} /><circle cx="98" cy="118" r="6" fill="#050a24" stroke={W} /><P x={128} y={122} c={COL[0]} pose="up" prop="book" /><P x={146} y={122} c={COL[1]} prop="seed" d={0.5} /><P x={36} y={122} c={COL[2]} pose="hold" prop="net" d={1} /></>),
  gaming: (c) => (<><rect x="20" y="66" width="160" height="12" rx="3" fill={N} />{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <P key={i} x={30 + i * 20} y={78} s={0.9} c={COL[i % 6]} pose={i % 2 ? 'up' : 'wave'} d={i * 0.2} />)}<Cloud x={40} y={108} o={0.5} /><Cloud x={90} y={100} o={0.5} /><Cloud x={140} y={92} o={0.5} /><P x={92} y={98} c={c} pose="up" prop="flag" /><path d="M164 122V92a11 11 0 0 1 22 0v30" stroke={c} strokeWidth="3" fill="none" className="tw" /></>),
  cinema: (c) => (<><ellipse cx="100" cy="44" rx="56" ry="28" fill={W} opacity=".25" /><ellipse cx="100" cy="44" rx="44" ry="20" fill={c} opacity=".5" className="tw" /><circle cx="86" cy="42" r="4" fill="#ffd166" className="tw" /><path d="M96 50q6 6 12 0" stroke="#050a24" fill="none" />{[0, 1, 2, 3].map((i) => <g key={i}><path d={`M${24 + i * 40} 96q16 14 32 0`} stroke={W} fill="none" /><P x={40 + i * 40} y={106} c={COL[i]} pose="sit" prop={i % 2 ? 'cup' : 'ball'} s={1.2} d={i * 0.4} /></g>)}</>),
  food: () => (<>{[0, 1, 2].map((i) => <g key={i}><Awning x={34 + i * 66} y={74} c={COL[(i * 2) % 6]} /><Tbl x={34 + i * 66} y={112} w={44} /><P x={34 + i * 66} y={122} c={COL[(i * 2 + 1) % 6]} pose="hold" prop={['bowl', 'fork', 'cup'][i]} d={i * 0.5} /></g>)}<path className="fl" d="M30 92q-5-8 0-14M44 92q-5-8 0-14" stroke={W} fill="none" opacity=".5" /></>),
  society: (c) => (<><Hut x={28} y={122} c={c} /><Hut x={172} y={122} c={c} /><Tbl x={100} y={116} w={36} />{[[62, 'wave'], [80, 'stand'], [120, 'wave'], [138, 'up'], [100, 'stand']].map(([x, p], i) => <P key={i} x={x} y={122} c={COL[i]} pose={p} d={i * 0.3} prop={i === 4 ? 'cup' : undefined} />)}</>),
  government: (c) => (<><Tbl x={100} y={114} w={64} />{[0, 1, 2, 3, 4, 5].map((i) => <P key={i} x={26 + i * 30} y={96} s={0.9} c={COL[i]} pose="wave" d={i * 0.2} />)}<P x={100} y={122} c={c} prop="hat" pose="up" s={1.7} /><rect x="58" y="98" width="14" height="16" rx="4" fill={W} opacity=".4" /><circle cx="64" cy="108" r="2" fill="#9aa5ce" /></>),
  laws: (c) => (<><Tbl x={100} y={116} w={50} /><rect x="90" y="102" width="20" height="3" fill="#fff" opacity=".6" /><P x={68} y={122} c="#7dd3fc" pose="hold" prop="brush" /><P x={132} y={122} c="#fbbf24" pose="hold" prop="brush" flip /><P x={100} y={122} c={c} pose="sit" s={1.1} /><Heart x={96} y={64} /><Heart x={110} y={54} c="#ffb347" /></>),
  'daily-life': (c) => (<><circle cx="100" cy="100" r="18" fill={c} opacity=".8" className="fl" /><Hut x={50} y={122} c={c} s={1.3} /><P x={78} y={122} c={COL[0]} pose="up" /><Tbl x={140} y={116} w={46} />{[124, 140, 156].map((x, i) => <P key={x} x={x} y={122} c={COL[i + 1]} pose="sit" prop="cup" s={1.2} d={i * 0.4} />)}</>),
  work: (c) => (<><Flo x={100} y={122} c={c} s={1.2} /><path d="M70 122l12-50M86 122l12-50" stroke="#c9a66b" strokeWidth="2" /><P x={64} y={122} c={COL[0]} pose="hold" prop="brush" /><Awning x={160} y={90} c={COL[4]} /><Tbl x={160} y={112} w={40} /><P x={160} y={122} c={COL[2]} prop="bell" pose="wave" /></>),
  healthcare: (c) => (<><Cloud x={80} y={110} s={1.8} o={0.55} /><P x={80} y={106} c={COL[0]} pose="lie" s={1.3} /><P x={124} y={122} c={c} pose="sit" prop="cup" s={1.3} /><Hut x={170} y={122} c={c} s={1.1} /><Heart x={96} y={70} /><Heart x={112} y={58} c="#f9a8d4" /></>),
  hospitality: (c) => (<><Hut x={100} y={122} c={c} s={2} /><P x={64} y={122} c={COL[0]} pose="wave" /><P x={140} y={122} c={COL[1]} prop="cake" pose="hold" /><P x={160} y={122} c={COL[3]} pose="stand" s={1.3} d={0.6} /><Heart x={100} y={44} c="#fbbf24" /></>),
  tourism: (c) => (<><path d="M10 122Q10 70 60 70T110 122z" fill={N} /><Whale x={140} y={40} s={0.8} c={c} /><Cloud x={40} y={34} /><Flo x={170} y={122} c={c} s={0.9} /><P x={36} y={122} c={COL[2]} pose="up" prop="flag" /><P x={92} y={122} c={COL[4]} prop="kite" pose="up" d={0.4} /><circle cx="150" cy="60" r="2" fill="#ffd166" className="tw" /></>),
  transport: (c) => (<><Cloud x={30} y={30} /><Cloud x={170} y={50} /><Whale x={100} y={78} s={1.9} c={c} />{[78, 100, 122].map((x, i) => <P key={x} x={x} y={68} s={0.9} c={COL[i]} pose="wave" d={i * 0.3} />)}<Whale x={30} y={108} s={0.5} c={W} /></>),
  festivals: (c) => (<><path d="M8 38Q100 74 192 38" stroke={W} fill="none" />{Array.from({ length: 10 }, (_, i) => { const x = 20 + i * 17; return <path key={i} d={`M${x} ${38 + Math.sin(((x - 8) / 184) * 3.14) * 28}l5 0-2.500 8z`} fill={COL[i % 6]} /> })}{[0, 1, 2, 3].map((i) => <P key={i} x={44 + i * 38} y={122} c={COL[i + 1]} pose={i % 2 ? 'wave' : 'up'} d={i * 0.25} />)}<Tbl x={170} y={116} w={30} /><P x={170} y={110} c={c} prop="cake" s={0.9} /></>),
  'economy-tech': (c) => (<><rect x="26" y="84" width="24" height="32" rx="7" fill={W} opacity=".3" />{[[32, 108], [40, 110], [36, 102], [44, 104]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#9aa5ce" />)}<g className="fl"><rect x="140" y="84" width="24" height="28" rx="7" fill={c} /><circle cx="148" cy="94" r="2.500" fill="#050a24" /><circle cx="157" cy="94" r="2.500" fill="#050a24" /><path d="M148 102q5 4 10 0" stroke="#050a24" fill="none" /></g><P x={84} y={122} c={COL[0]} pose="hold" prop="pebble" /><P x={112} y={122} c={COL[1]} pose="hold" flip d={0.5} /></>),
  city: (c) => (<>{[[16, 50, 16], [40, 70, 14], [62, 40, 18], [88, 84, 18], [116, 56, 16], [140, 74, 14], [164, 48, 18]].map(([x, h, w], i) => <g key={i}><path d={`M${x} 122v-${h}a${w / 2} ${w / 2} 0 0 1 ${w} 0v${h}z`} fill={N} />{[0, 1].map((r) => <rect key={r} className="tw" x={x + w / 2 - 2} y={122 - h + 10 + r * 16} width="4" height="7" rx="2" fill={c} />)}</g>)}<path d="M30 76Q76 92 124 70" stroke={W} fill="none" opacity=".5" /><P x={76} y={84} s={0.6} c={COL[0]} /></>),
  nature: (c) => (<><Flo x={40} y={122} c={c} s={1.3} /><Flo x={100} y={122} c={COL[0]} s={1.7} /><Flo x={160} y={122} c={COL[4]} s={1.2} /><P x={72} y={122} c={COL[2]} pose="hold" prop="net" />{[[30, 50], [70, 40], [130, 56], [176, 44]].map(([x, y], i) => <circle key={i} className="tw" cx={x} cy={y} r="1.800" fill="#ffd166" style={{ animationDelay: `${i * 0.4}s` }} />)}</>),
  abyss: () => (<><ellipse cx="100" cy="112" rx="76" ry="40" fill={N} /><path d="M72 96q8 5 16 0M112 96q8 5 16 0" stroke={W} fill="none" /><text className="tw" x="136" y="74" fill="#cfd8ff" fontSize="12">z</text><text className="tw" x="148" y="62" fill="#cfd8ff" fontSize="9">z</text><P x={100} y={80} s={0.9} c={COL[0]} pose="lie" /></>),
  music: (c) => (<><rect x="40" y="96" width="120" height="8" rx="3" fill={N} /><P x={70} y={96} c={COL[0]} pose="hold" prop="drum" /><P x={100} y={96} c={c} pose="up" /><P x={130} y={96} c={COL[2]} pose="wave" prop="bell" />{[0, 1, 2, 3, 4].map((i) => <P key={i} x={30 + i * 35} y={122} s={1.1} c={COL[i + 1]} pose="up" d={i * 0.3} />)}{[[60, 60], [120, 50], [150, 70]].map(([x, y], i) => <circle key={i} className="fl" cx={x} cy={y} r="3" fill={c} />)}</>),
  rest: (c) => (<><circle cx="160" cy="32" r="14" fill={W} /><circle cx="167" cy="28" r="12" fill="#0a1238" />{[0, 1, 2, 3].map((i) => <g key={i}><Cloud x={34 + i * 44} y={108} s={1.1} o={0.5} /><P x={34 + i * 44} y={102} pose="lie" c={COL[i]} s={1.1} /></g>)}<P x={100} y={122} c={c} pose="sit" prop="bell" /></>),
  business: () => (<>{[0, 1, 2].map((i) => <g key={i}><Awning x={34 + i * 66} y={72} c={COL[(i * 2 + 2) % 6]} /><Tbl x={34 + i * 66} y={112} w={44} /><rect x={20 + i * 66} y={76} width="28" height="8" rx="2" fill="#0a1238" opacity=".7" /><P x={34 + i * 66} y={122} c={COL[i]} pose="wave" prop={['cake', 'flower', 'book'][i]} d={i * 0.4} /></g>)}</>),
  housing: (c) => (<>{[[40, 80], [100, 56], [160, 90]].map(([x, y], i) => <g key={i}><rect x={x - 1.500} y={y} width="3" height={122 - y} fill="#1b5e4a" /><Hut x={x} y={y} c={COL[i * 2]} /></g>)}<path d="M44 82Q72 96 96 60M104 60Q132 98 156 92" stroke={W} fill="none" opacity=".6" /><P x={100} y={56} s={0.8} c={c} pose="wave" /></>),
  family: (c) => (<><Tbl x={100} y={114} w={74} /><rect x="94" y="102" width="12" height="6" fill="#f9a8d4" /><circle cx="100" cy="100" r="1.500" fill="#ffb347" />{[[62, 1.4], [82, 1.1], [118, 1.1], [138, 1.4]].map(([x, s], i) => <P key={i} x={x} y={122} s={s} c={COL[i]} pose="sit" prop={i % 2 ? 'cup' : undefined} d={i * 0.3} />)}<Hut x={178} y={122} c={c} s={0.9} /></>),
  fashion: (c) => (<><path d="M20 62h60" stroke={W} />{[28, 42, 56, 70].map((x, i) => <path key={x} d={`M${x} 62l-5 34h10z`} fill={COL[i]} opacity=".85" />)}<P x={120} y={122} c={c} prop="hat" pose="up" s={1.6} /><P x={162} y={122} c={COL[1]} pose="hold" prop="brush" /><circle className="tw" cx="108" cy="66" r="3" fill={COL[0]} /><circle className="tw" cx="136" cy="72" r="3" fill={COL[3]} /></>),
  science: (c) => (<><path d="M70 122l12-30 12 30M82 92l30-30" stroke="#c9a66b" strokeWidth="2.500" /><rect x="104" y="52" width="22" height="8" rx="4" transform="rotate(-38 104 56)" fill={c} />{[[40, 36], [60, 56], [150, 40], [172, 66]].map(([x, y], i) => <circle key={i} className="tw" cx={x} cy={y} r="2.200" fill="#ffd166" style={{ animationDelay: `${i * 0.4}s` }} />)}<P x={58} y={122} c={COL[0]} pose="hold" prop="net" /><P x={150} y={122} c={COL[2]} pose="up" prop="cup" /></>),
  communication: (c) => (<><Hut x={36} y={122} c={c} s={1.2} /><Hut x={164} y={122} c={COL[4]} s={1.2} /><path d="M44 96Q100 122 156 96" stroke={W} fill="none" /><circle cx="44" cy="96" r="3" fill={c} /><circle cx="156" cy="96" r="3" fill={COL[4]} /><P x={66} y={122} c={COL[0]} pose="wave" /><P x={134} y={122} c={COL[1]} pose="wave" flip /><path className="fl" d="M90 44q4-5 8 0q4-5 8 0" stroke={W} fill="none" /></>),
  awards: (c) => (<><rect x="76" y="100" width="22" height="22" fill={N} stroke={W} /><rect x="98" y="88" width="22" height="34" fill={N} stroke={c} /><rect x="120" y="106" width="22" height="16" fill={N} stroke={W} />{[[87, 100], [109, 88], [131, 106]].map(([x, y], i) => <P key={i} x={x} y={y} c={COL[i]} pose="up" prop={i === 1 ? 'star' : undefined} s={1.1} />)}{[0, 1, 2, 3].map((i) => <P key={i} x={26 + i * 14 + (i > 1 ? 90 : 0)} y={122} s={1} c={COL[i + 2]} pose="up" d={i * 0.3} />)}</>),
  history: (c) => (<><rect x="30" y="34" width="140" height="68" rx="6" fill={N} stroke={c} strokeOpacity=".5" /><circle cx="64" cy="64" r="14" fill={COL[2]} opacity=".8" /><path d="M90 90l16-34 16 34z" fill={COL[0]} opacity=".8" /><path d="M128 70q10-12 20 0t-20 14z" fill={COL[1]} opacity=".8" /><P x={46} y={122} c={COL[4]} pose="hold" prop="brush" s={1.5} /><P x={150} y={122} c={COL[3]} pose="wave" s={1.1} /></>),
  safety: () => (<><rect x="150" y="60" width="6" height="62" fill="#6b4f2a" /><circle cx="153" cy="52" r="22" fill="#1b5e4a" /><path className="fl" d="M146 42l5 6-5 6-5-6z" fill="#a78bfa" /><path d="M120 122l24-66M130 122l24-66" stroke="#c9a66b" strokeWidth="2" /><P x={108} y={122} c="#facc15" pose="hold" /><P x={88} y={122} c={COL[0]} pose="wave" s={1.2} /><Heart x={96} y={70} /></>),
  recreation: (c) => (<><P x={44} y={122} c={COL[0]} pose="up" prop="kite" d={0.2} /><ellipse cx="108" cy="122" rx="22" ry="5" fill={c} opacity=".35" /><P x={108} y={112} c={COL[3]} pose="up" d={0.4} /><circle className="tw" cx="94" cy="108" r="2" fill={W} /><circle className="tw" cx="122" cy="106" r="2" fill={W} /><P x={164} y={122} c={COL[2]} pose="hold" prop="ball" /></>),
  hobbies: (c) => (<><Hut x={28} y={122} c={c} s={1.2} /><path d="M92 122l8-44 8 44M100 78V60" stroke="#c9a66b" strokeWidth="2" /><rect x="84" y="50" width="32" height="26" rx="2" fill="#fff" opacity=".85" /><circle cx="94" cy="60" r="4" fill={COL[0]} /><circle cx="106" cy="66" r="5" fill={COL[3]} /><P x={72} y={122} c={COL[1]} pose="hold" prop="brush" /><P x={138} y={122} c={COL[2]} prop="flower" pose="hold" /><P x={170} y={122} c={COL[4]} pose="hold" prop="drum" d={0.5} /></>),
  playgrounds: (c) => (<><path d="M30 122V66l46 56z" fill={N} stroke={c} /><P x={50} y={92} s={0.9} c={COL[0]} pose="up" /><path d="M110 122V60M150 122V60M110 60h40M122 60v40M138 60v40" stroke="#c9a66b" strokeWidth="2" /><rect x="118" y="100" width="24" height="4" rx="2" fill={COL[2]} /><P x={130} y={102} s={0.9} c={COL[3]} pose="up" /><ellipse cx="176" cy="102" rx="14" ry="6" fill={COL[4]} /><rect x="173" y="104" width="6" height="18" fill="#e9d5ff" /></>),
  friends: () => (<><P x={80} y={122} c={COL[0]} pose="wave" s={1.5} /><P x={104} y={122} c={COL[3]} pose="wave" s={1.5} flip d={0.3} /><P x={156} y={122} c={COL[2]} pose="up" prop="flower" d={0.6} /><P x={36} y={122} c={COL[4]} pose="hold" prop="pebble" /><Heart x={86} y={66} /><Heart x={104} y={54} c="#ffb347" /><Heart x={120} y={68} c="#a78bfa" /></>),
}

const Scene = ({ id, color = '#3ff2d0', className = '', style }) => {
  const [, tick] = useState(0)
  useEffect(() => {
    if (cache[id] !== undefined) return
    cache[id] = false
    const im = new Image()
    im.onload = () => { cache[id] = true; tick((t) => t + 1) }
    im.src = `/images/${id}.webp`
  }, [id])
  if (cache[id] === true) return <img src={`/images/${id}.webp`} alt="" className={`${className} object-cover`} style={style} />
  return (
    <svg style={style} viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs><linearGradient id={`sky${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a1238" /><stop offset=".75" stopColor={color} stopOpacity=".28" /><stop offset="1" stopColor="#0a1238" /></linearGradient></defs>
      <rect width="200" height="140" fill={`url(#sky${id})`} />
      {[[20, 14], [60, 30], [120, 12], [170, 26], [150, 50], [30, 56]].map(([x, y], i) => <circle key={i} className="tw" cx={x} cy={y} r="1" fill="#fff" style={{ animationDelay: `${i * 0.4}s` }} />)}
      <circle cx="170" cy="22" r="7" fill="#ffe3b0" opacity=".85" />
      {(scenes[id] || scenes.nature)(color)}
      <path d="M0 124Q50 116 100 124T200 124V140H0Z" fill="#050a24" opacity=".8" />
    </svg>
  )
}

export default Scene
