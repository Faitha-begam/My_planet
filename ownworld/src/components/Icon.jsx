const paths = {
  lantern: <><rect x="8" y="6" width="8" height="12" rx="3" /><path d="M12 2v4M9 20h6" /></>,
  bead: <circle cx="12" cy="12" r="6" />,
  wave: <path d="M2 14q5-8 10 0t10 0" />,
  house: <path d="M4 20V11l8-6 8 6v9z" />,
  bell: <path d="M6 17q0-10 6-10t6 10zM10 20h4" />,
  leaf: <path d="M5 19C5 9 11 5 19 5c0 8-4 14-14 14zM5 19l8-8" />,
  moon: <path d="M16 4a8 8 0 1 0 4 12A8 8 0 0 1 16 4z" />,
  hand: <path d="M7 20v-8l-2-3 2-1 2 3V5h2v7V4h2v8V6h2v8V9h2v8q0 3-4 3z" />,
  star: <path d="M12 3l2.5 6 6.5.5-5 4.3 1.6 6.4L12 17l-5.6 3.2L8 13.8 3 9.5 9.5 9z" />,
  gear: <><circle cx="12" cy="12" r="4" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" /></>,
  heart: <path d="M12 20S4 14 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5-8 11-8 11z" />,
  book: <path d="M4 5h7v14H4zM13 5h7v14h-7z" />,
  eye: <><path d="M2 12q10-10 20 0-10 10-20 0z" /><circle cx="12" cy="12" r="3" /></>,
  fish: <path d="M3 12q6-8 13 0-7 8-13 0zM16 12l5-4v8z" />,
  bowl: <path d="M3 11h18a9 8 0 0 1-18 0z" />,
  boat: <path d="M3 15h18l-3 5H6zM12 4v10l6-3z" />,
  ring: <circle cx="12" cy="12" r="8" />,
}

const Icon = ({ name, className = 'size-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
    {paths[name] || paths.ring}
  </svg>
)

export default Icon
