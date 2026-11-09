import { useEffect } from 'react'

const RADIUS = 260

// Your glow: eases toward the pointer, wanders alone when idle, and
// writes --lx/--ly on the container plus --glow (0..1) on every [data-glow].
export const useLight = (ref) => {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const light = { x: innerWidth / 2, y: innerHeight / 2 }
    const target = { ...light }
    let lastMove = 0
    let frame

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      lastMove = performance.now()
    }
    const tick = (t) => {
      if (!reduced && t - lastMove > 3500) {
        target.x = innerWidth * (0.5 + 0.34 * Math.sin(t / 4200))
        target.y = innerHeight * (0.45 + 0.3 * Math.sin(t / 3100 + 1))
      }
      light.x += (target.x - light.x) * 0.08
      light.y += (target.y - light.y) * 0.08
      root.style.setProperty('--lx', `${light.x}px`)
      root.style.setProperty('--ly', `${light.y}px`)
      root.querySelectorAll('[data-glow]').forEach((node) => {
        const r = node.getBoundingClientRect()
        const d = Math.hypot(r.left + r.width / 2 - light.x, r.top + r.height / 2 - light.y)
        node.style.setProperty('--glow', Math.max(0, 1 - d / RADIUS).toFixed(3))
      })
      frame = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onMove)
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      cancelAnimationFrame(frame)
    }
  }, [ref])
}
