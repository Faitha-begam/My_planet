// The Wickfolk: each carries the tool of their trade and a flame on their head.
const acc = {
  lamp: (c) => <><rect x="45" y="60" width="9" height="13" rx="3" fill={c} className="tw" /><path d="M49.500 52v8" stroke="#ffe3b0" /></>,
  bell: () => <path d="M43 70q0-12 7-12t7 12zM46 72h8" fill="#ffe3b0" />,
  ladle: () => <><path d="M50 40v34" stroke="#ffe3b0" strokeWidth="2.500" /><circle cx="50" cy="76" r="6" fill="#ffe3b0" /></>,
  book: () => <rect x="42" y="60" width="15" height="12" rx="1.500" fill="#ffe3b0" />,
  scroll: () => <><rect x="43" y="58" width="12" height="16" rx="3" fill="#ffe3b0" /><path d="M46 63h6M46 67h6" stroke="#0a1238" /></>,
  pole: (c) => <><path d="M52 24v68" stroke="#ffe3b0" strokeWidth="2.500" /><circle cx="52" cy="22" r="5" fill={c} className="tw" /></>,
  glass: () => <circle cx="48" cy="64" r="8" fill="#9be7ff" fillOpacity=".5" stroke="#fff" />,
  oar: () => <><path d="M51 36v50" stroke="#ffe3b0" strokeWidth="2.500" /><ellipse cx="51" cy="86" rx="4" ry="8" fill="#ffe3b0" /></>,
}

const Character = ({ kind = 'lamp', color = '#3ff2d0', className = 'h-40' }) => (
  <svg viewBox="0 0 60 100" className={className} aria-hidden="true">
    <g className="fl">
      <path d="M30 4q-6 9 0 15 6-6 0-15z" fill={color} className="tw" />
      <circle cx="30" cy="30" r="10" fill="#dbe4ff" />
      <circle cx="26.500" cy="30" r="1.400" fill="#0a1238" /><circle cx="33.500" cy="30" r="1.400" fill="#0a1238" />
      <path d="M26 35q4 3 8 0" stroke="#0a1238" fill="none" strokeWidth="1" />
      <path d="M12 96q2-46 18-54 16 8 18 54z" fill={color} opacity=".85" />
      <path d="M12 96q2-46 18-54 16 8 18 54z" fill="#0a1238" opacity=".4" />
      {(acc[kind] || acc.lamp)(color)}
    </g>
  </svg>
)

export default Character
