let audioContext = null

function getAudioContext() {
  if (typeof window === 'undefined') return null

  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null
    audioContext = new AudioCtx()
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }

  return audioContext
}

function playTone({
  frequency,
  duration = 0.08,
  type = 'sine',
  gain = 0.06,
  attack = 0.004,
  decay = 0.07,
  detune = 0,
}) {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const oscillator = ctx.createOscillator()
  const volume = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, now)
  oscillator.detune.setValueAtTime(detune, now)

  volume.gain.setValueAtTime(0.0001, now)
  volume.gain.exponentialRampToValueAtTime(gain, now + attack)
  volume.gain.exponentialRampToValueAtTime(0.0001, now + decay)

  oscillator.connect(volume)
  volume.connect(ctx.destination)

  oscillator.start(now)
  oscillator.stop(now + duration)
}

const soundFileCache = new Map()
const soundStopTimers = new Map()
const soundReadyCache = new Map()
const soundFadeTimers = new Map()
const audioElementChains = new WeakMap()

function connectAudioElement(audio) {
  const ctx = getAudioContext()
  if (!ctx) return null

  let chain = audioElementChains.get(audio)
  if (!chain) {
    const source = ctx.createMediaElementSource(audio)
    const gain = ctx.createGain()
    source.connect(gain)
    gain.connect(ctx.destination)
    chain = { source, gain }
    audioElementChains.set(audio, chain)
  }

  return chain
}

function clearSoundTimers(src) {
  const stopTimer = soundStopTimers.get(src)
  if (stopTimer) {
    window.clearTimeout(stopTimer)
    soundStopTimers.delete(src)
  }

  const fadeTimer = soundFadeTimers.get(src)
  if (fadeTimer) {
    window.clearTimeout(fadeTimer)
    soundFadeTimers.delete(src)
  }
}

function scheduleSoundStop(src, audio, delayMs) {
  const timer = window.setTimeout(() => {
    audio.pause()
    audio.currentTime = 0
    soundStopTimers.delete(src)
  }, delayMs)

  soundStopTimers.set(src, timer)
}

function encodeSoundPath(src) {
  return src
    .split('/')
    .map((part, index) => {
      if (!part || index === 0) return part
      return encodeURIComponent(part)
    })
    .join('/')
}

export async function unlockAudioPlayback() {
  const ctx = getAudioContext()
  if (!ctx) return false

  if (ctx.state === 'suspended') {
    try {
      await ctx.resume()
    } catch {
      return false
    }
  }

  return ctx.state === 'running'
}

function getOrCreateSound(src) {
  const url = encodeSoundPath(src)
  let audio = soundFileCache.get(src)

  if (!audio) {
    audio = new Audio()
    audio.preload = 'auto'
    soundFileCache.set(src, audio)
    soundReadyCache.set(src, false)

    audio.addEventListener('canplaythrough', () => {
      soundReadyCache.set(src, true)
    })

    audio.addEventListener('error', () => {
      soundReadyCache.set(src, false)
      console.warn(
        `[Memory Oven] Sound file not found or unsupported: ${src}`,
      )
    })
  }

  if (audio.dataset.src !== url) {
    audio.dataset.src = url
    audio.src = url
    audio.load()
  }

  return audio
}

export function preloadSoundFile(src) {
  if (!src) return
  getOrCreateSound(src)
}

export async function playSoundFile(
  src,
  { volume = 0.45, loop = false, stopAfterMs, fadeInMs = 0, fadeOutMs = 0 } = {},
) {
  if (typeof window === 'undefined' || !src) return null

  await unlockAudioPlayback()

  const audio = getOrCreateSound(src)
  const ctx = getAudioContext()

  clearSoundTimers(src)

  audio.loop = loop
  audio.currentTime = 0

  const usesFade = fadeInMs > 0 || fadeOutMs > 0
  const chain = usesFade ? connectAudioElement(audio) : null

  if (chain && ctx) {
    const { gain } = chain
    const now = ctx.currentTime
    const targetVolume = Math.max(volume, 0.0001)
    const fadeInSec = fadeInMs / 1000
    const fadeOutSec = fadeOutMs / 1000

    gain.gain.cancelScheduledValues(now)
    gain.gain.setValueAtTime(0.0001, now)

    if (fadeInMs > 0) {
      gain.gain.exponentialRampToValueAtTime(targetVolume, now + fadeInSec)
    } else {
      gain.gain.setValueAtTime(targetVolume, now)
    }

    if (stopAfterMs && fadeOutMs > 0) {
      const stopAt = now + stopAfterMs / 1000
      const fadeOutStart = Math.max(now + fadeInSec, stopAt - fadeOutSec)
      gain.gain.setValueAtTime(targetVolume, fadeOutStart)
      gain.gain.exponentialRampToValueAtTime(0.0001, stopAt)
    }

    audio.volume = 1
  } else {
    audio.volume = volume
  }

  try {
    await audio.play()
  } catch (error) {
    console.warn(`[Memory Oven] Could not play sound: ${src}`, error)
    return null
  }

  if (stopAfterMs) {
    scheduleSoundStop(src, audio, stopAfterMs)
  }

  return audio
}

export function stopSoundFile(src, { fadeOutMs = 0 } = {}) {
  clearSoundTimers(src)

  const audio = soundFileCache.get(src)
  if (!audio) return

  const ctx = getAudioContext()
  const chain = audioElementChains.get(audio)

  if (fadeOutMs > 0 && chain && ctx && !audio.paused) {
    const { gain } = chain
    const now = ctx.currentTime
    const currentVolume = Math.max(gain.gain.value, 0.0001)
    const fadeOutSec = fadeOutMs / 1000

    gain.gain.cancelScheduledValues(now)
    gain.gain.setValueAtTime(currentVolume, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + fadeOutSec)

    const timer = window.setTimeout(() => {
      audio.pause()
      audio.currentTime = 0
      soundFadeTimers.delete(src)
    }, fadeOutMs)

    soundFadeTimers.set(src, timer)
    return
  }

  audio.pause()
  audio.currentTime = 0
}

export function primeToySounds() {
  getAudioContext()
}

export function playTabClick() {
  playTone({ frequency: 520, type: 'triangle', gain: 0.05, decay: 0.06 })
  window.setTimeout(() => {
    playTone({ frequency: 760, type: 'sine', gain: 0.035, decay: 0.05 })
  }, 24)
}

export function playPageTurn() {
  playTone({ frequency: 180, type: 'triangle', gain: 0.045, decay: 0.12 })
  window.setTimeout(() => {
    playTone({ frequency: 240, type: 'sine', gain: 0.03, decay: 0.1, detune: -80 })
  }, 40)
  window.setTimeout(() => {
    playTone({ frequency: 320, type: 'sine', gain: 0.02, decay: 0.08 })
  }, 110)
}

export function playEnterPop() {
  playTone({ frequency: 420, type: 'sine', gain: 0.05, decay: 0.09 })
  window.setTimeout(() => {
    playTone({ frequency: 620, type: 'triangle', gain: 0.04, decay: 0.08 })
  }, 55)
}

export function playIngredientCheck(isChecking = true) {
  if (isChecking) {
    playTone({ frequency: 680, type: 'triangle', gain: 0.048, decay: 0.065 })
    window.setTimeout(() => {
      playTone({ frequency: 920, type: 'sine', gain: 0.032, decay: 0.055 })
    }, 28)
    return
  }

  playTone({ frequency: 460, type: 'sine', gain: 0.034, decay: 0.05 })
}
