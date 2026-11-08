import { useCallback, useEffect, useState } from 'react'

const EVENT = 'thalune-ls'

// Persists to LocalStorage and keeps every component using the same key in sync.
export const useLocalStorage = (key, initial) => {
  const read = () => {
    try {
      const stored = localStorage.getItem(key)
      return stored === null ? initial : JSON.parse(stored)
    } catch {
      return initial
    }
  }
  const [value, setValue] = useState(read)

  useEffect(() => {
    const sync = () => setValue((prev) => {
      const next = read()
      return JSON.stringify(next) === JSON.stringify(prev) ? prev : next
    })
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const set = useCallback((update) => {
    setValue((prev) => {
      const next = typeof update === 'function' ? update(prev) : update
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch {
        /* storage unavailable: the world still works, it just forgets */
      }
      queueMicrotask(() => window.dispatchEvent(new Event(EVENT)))
      return next
    })
  }, [key])

  return [value, set]
}
