import { useEffect, useRef, useState } from 'react'

const Reveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition duration-700 ${on ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default Reveal
