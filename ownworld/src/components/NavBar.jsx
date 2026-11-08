import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { isOn, setSound } from '../audio'

// The journey, in order. Each label says what the chapter is.
const chapters = [['/', 'Arrive', 'The landing'], ['/origins', 'Origins', 'Chapter 1: history'], ['/world', 'The World', 'Chapter 2: map'], ['/realms', 'Realms', 'Chapter 3: life'], ['/people', 'People', 'Chapter 4: inhabitants']]

const NavBar = () => {
  const [sound, setS] = useState(isOn())
  const toggle = () => { if (setSound(!sound)) setS(!sound) }
  return (
    <nav aria-label="The journey" className="fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-3 bg-gradient-to-b from-abyss/90 to-transparent px-4 py-3 sm:px-8">
      <Link to="/" className="text-xs font-extrabold tracking-[0.4em] text-wick sm:text-sm">THALUNE</Link>
      <div className="flex items-center gap-3 overflow-x-auto text-xs sm:gap-6 sm:text-sm">
        {chapters.map(([to, label, hint], i) => (
          <NavLink key={to} to={to} end={to === '/'} title={hint}
            className={({ isActive }) => `shrink-0 border-b pb-1 transition ${isActive ? 'border-wick text-white' : 'border-transparent text-mist/70 hover:text-white'}`}>
            {i > 0 && <span className="mr-1 text-wick/70">{i}</span>}{label}
          </NavLink>
        ))}
        <button type="button" onClick={toggle} aria-pressed={sound} className={`shrink-0 rounded-full border px-3 py-1 text-xs ${sound ? 'border-wick text-wick' : 'border-white/30 text-mist/70'}`}>{sound ? 'Sound on' : 'Sound off'}</button>
      </div>
    </nav>
  )
}

export default NavBar
