import { useCallback, useEffect, useRef, useState } from 'react'
import {
  playEnterPop,
  playPageTurn,
  playSoundFile,
  preloadSoundFile,
  primeToySounds,
  stopSoundFile,
  unlockAudioPlayback,
} from '../utils/toySounds'

const INTRO_VIDEO = '/assets/lets cook video.mp4'
const LETS_COOK_BUTTON = '/assets/lets cook button.png'
const STEAM_IMAGE = '/assets/decor recipes/steam.png'

const OVEN_TIMER_DING_SOUND = '/assets/sounds/oven timer ding.mp3'
const STEAM_HISS_SOUND = '/assets/sounds/steam hiss.m4a'
const STEAM_HISS_MS = 2000
const STEAM_FADE_IN_MS = 500
const STEAM_FADE_OUT_MS = 800
const STEAM_STOP_FADE_MS = 350

const INTRO_HANDOFF_AT = 6.75
const PAUSE_AT_SECONDS = 7.15

export default function OpeningScreen({ onStart, exiting = false }) {
  const videoRef = useRef(null)
  const audioReadyRef = useRef(false)
  const dingPlayedRef = useRef(false)
  const steamPlayedRef = useRef(false)
  const steamQueuedRef = useRef(false)
  const [buttonVisible, setButtonVisible] = useState(false)
  const [isHeld, setIsHeld] = useState(false)
  const heldRef = useRef(false)

  const playTimerDing = useCallback(async () => {
    if (dingPlayedRef.current) return

    const played = await playSoundFile(OVEN_TIMER_DING_SOUND, { volume: 0.62 })
    if (played) {
      dingPlayedRef.current = true
    }
  }, [])

  const playSteamHiss = useCallback(async () => {
    if (steamPlayedRef.current) return

    if (!audioReadyRef.current) {
      steamQueuedRef.current = true
      return
    }

    const played = await playSoundFile(STEAM_HISS_SOUND, {
      volume: 0.38,
      stopAfterMs: STEAM_HISS_MS,
      fadeInMs: STEAM_FADE_IN_MS,
      fadeOutMs: STEAM_FADE_OUT_MS,
    })

    if (played) {
      steamPlayedRef.current = true
      steamQueuedRef.current = false
    }
  }, [])

  const unlockOpeningAudio = useCallback(async () => {
    const unlocked = await unlockAudioPlayback()
    if (!unlocked) return false

    audioReadyRef.current = true
    primeToySounds()

    if (!dingPlayedRef.current) {
      await playTimerDing()
    }

    if (steamQueuedRef.current) {
      await playSteamHiss()
    }

    return true
  }, [playSteamHiss, playTimerDing])

  useEffect(() => {
    primeToySounds()
    preloadSoundFile(OVEN_TIMER_DING_SOUND)
    preloadSoundFile(STEAM_HISS_SOUND)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    function holdOpenOven() {
      if (heldRef.current) return

      heldRef.current = true
      video.pause()
      video.currentTime = PAUSE_AT_SECONDS
      setIsHeld(true)
      setButtonVisible(true)
      void playSteamHiss()
    }

    function handleTimeUpdate() {
      if (heldRef.current) return

      if (video.currentTime >= INTRO_HANDOFF_AT) {
        setButtonVisible(true)
      }

      if (video.currentTime >= PAUSE_AT_SECONDS) {
        holdOpenOven()
      }
    }

    function handleEnded() {
      holdOpenOven()
    }

    video.currentTime = 0
    void video.play().catch(() => {})

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [playSteamHiss])

  useEffect(() => {
    if (!exiting) return undefined

    stopSoundFile(STEAM_HISS_SOUND, { fadeOutMs: STEAM_STOP_FADE_MS })

    return undefined
  }, [exiting])

  async function handleStart() {
    if (!buttonVisible || exiting) return

    await unlockOpeningAudio()
    playEnterPop()
    playPageTurn()
    stopSoundFile(STEAM_HISS_SOUND, { fadeOutMs: STEAM_STOP_FADE_MS })
    onStart()
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== 'Enter' || !buttonVisible || exiting) return
      event.preventDefault()
      void handleStart()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [buttonVisible, exiting, onStart, unlockOpeningAudio])

  return (
    <div
      className={`opening-screen${exiting ? ' opening-screen--exit' : ''}`}
      onPointerDown={() => {
        void unlockOpeningAudio()
      }}
    >
      <video
        ref={videoRef}
        className="opening-screen-video"
        src={INTRO_VIDEO}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      />

      {isHeld && (
        <div className="opening-screen-steam-layer" aria-hidden="true">
          <img className="opening-steam opening-steam--left opening-steam--back" src={STEAM_IMAGE} alt="" draggable={false} />
          <img className="opening-steam opening-steam--left opening-steam--mid" src={STEAM_IMAGE} alt="" draggable={false} />
          <img className="opening-steam opening-steam--left opening-steam--front" src={STEAM_IMAGE} alt="" draggable={false} />

          <img className="opening-steam opening-steam--center opening-steam--back" src={STEAM_IMAGE} alt="" draggable={false} />
          <img className="opening-steam opening-steam--center opening-steam--mid" src={STEAM_IMAGE} alt="" draggable={false} />
          <img className="opening-steam opening-steam--center opening-steam--front" src={STEAM_IMAGE} alt="" draggable={false} />

          <img className="opening-steam opening-steam--right opening-steam--back" src={STEAM_IMAGE} alt="" draggable={false} />
          <img className="opening-steam opening-steam--right opening-steam--mid" src={STEAM_IMAGE} alt="" draggable={false} />
          <img className="opening-steam opening-steam--right opening-steam--front" src={STEAM_IMAGE} alt="" draggable={false} />
        </div>
      )}

      <div className="opening-screen-vignette" aria-hidden="true" />

      {buttonVisible && (
        <button
          type="button"
          className={`lets-cook-button lets-cook-button--enter${exiting ? ' lets-cook-button--exit' : ''}`}
          onClick={() => {
            void handleStart()
          }}
          disabled={exiting}
          aria-label="Let's Cook"
        >
          <img
            className="lets-cook-button-image"
            src={LETS_COOK_BUTTON}
            alt="Let's Cook!"
            draggable={false}
          />
        </button>
      )}

      {exiting && (
        <img
          className="opening-screen-steam"
          src={STEAM_IMAGE}
          alt=""
          draggable={false}
        />
      )}
    </div>
  )
}
