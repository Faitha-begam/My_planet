import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Fog from './components/Fog'
import NavBar from './components/NavBar'
import { useLight } from './hooks/useLight'
import Origins from './pages/Origins'
import People from './pages/People'
import Realm from './pages/Realm'
import Realms from './pages/Realms'
import Department from './pages/Department'
import Destination from './pages/Destination'
import Explore from './pages/Explore'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'

const App = () => {
  const rootRef = useRef(null)
  const { pathname } = useLocation()
  useLight(rootRef)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div ref={rootRef} className="relative min-h-screen bg-abyss" style={{ '--lx': '50vw', '--ly': '50vh' }}>
      <div className="pointer-events-none fixed inset-0">
        <Fog />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle 340px at var(--lx) var(--ly), rgba(63,242,208,0.10), rgba(5,10,36,0.55) 100%)' }} />
      </div>
      <NavBar />
      <div key={pathname} className="relative z-10 animate-[page-in_0.7s_ease-out]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/world" element={<Explore />} />
          <Route path="/world/:id" element={<Destination />} />
          <Route path="/origins" element={<Origins />} />
          <Route path="/realms" element={<Realms />} />
          <Route path="/realms/:id" element={<Realm />} />
          <Route path="/people" element={<People />} />
          <Route path="/sector/:id" element={<Department />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
