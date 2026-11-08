// Atmosphere made from nothing but oscillators: a low drone and the occasional bell.
let ctx = null
let master = null
let on = false
const scale = [261.6, 293.7, 329.6, 392, 440, 523.3]

const startDrone = () => {
  ;[55, 82.4, 110.2].forEach((f, i) => {
    const o = ctx.createOscillator(), g = ctx.createGain(), l = ctx.createOscillator(), lg = ctx.createGain()
    o.type = 'sine'; o.frequency.value = f; g.gain.value = 0.07 / (i + 1)
    l.frequency.value = 0.07 + i * 0.03; lg.gain.value = 0.03
    l.connect(lg); lg.connect(g.gain); o.connect(g); g.connect(master)
    o.start(); l.start()
  })
  setInterval(() => on && chime(scale[Math.floor(Math.random() * scale.length)], 0.08), 7000)
}

export const isOn = () => on

export const setSound = (v) => {
  if (v && !ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return false
    ctx = new AC(); master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination); startDrone()
  }
  if (!ctx) return false
  if (ctx.state === 'suspended') ctx.resume()
  master.gain.cancelScheduledValues(ctx.currentTime)
  master.gain.linearRampToValueAtTime(v ? 0.6 : 0, ctx.currentTime + 1.5)
  on = v
  return true
}

export const chime = (freq = 523, vol = 0.15, dur = 2.6) => {
  if (!ctx || !on) return
  const o = ctx.createOscillator(), g = ctx.createGain()
  o.type = 'sine'; o.frequency.value = freq
  g.gain.setValueAtTime(vol, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
  o.connect(g); g.connect(master); o.start(); o.stop(ctx.currentTime + dur)
}

export const tone = (freq) => chime(freq, 0.18, 1.6)
