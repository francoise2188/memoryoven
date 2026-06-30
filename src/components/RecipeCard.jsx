import { useEffect, useState } from 'react'
import OpenBook from './OpenBook'

const START_BUTTON_IMAGE = '/assets/decor recipes/pencil start button.png'
const PAGE_FLIP_MS = 700

export default function RecipeCard({ sceneReady, bookSettled = false, onStart }) {
  const [flipping, setFlipping] = useState(false)

  useEffect(() => {
    if (!flipping) return undefined

    const timer = window.setTimeout(() => {
      onStart()
    }, PAGE_FLIP_MS)

    return () => window.clearTimeout(timer)
  }, [flipping, onStart])

  function handleStart() {
    if (!sceneReady || flipping) return
    setFlipping(true)
  }

  return (
    <OpenBook
      visible={sceneReady && !bookSettled}
      settled={sceneReady && bookSettled}
      flipping={flipping}
    >
      <div className="book-text book-text--left">
        <h1 className="recipe-card-title">
          <span className="title-line">Larsen</span>
          <span className="title-line">Kitchen</span>
        </h1>
      </div>

      <div className="book-text book-text--right">
        <p className="subtitle">warming memories...</p>
      </div>

      <button
        type="button"
        className="start-button"
        onClick={handleStart}
        disabled={!sceneReady || flipping}
      >
        <img
          className="start-button-image"
          src={START_BUTTON_IMAGE}
          alt="Start"
          draggable={false}
        />
      </button>
    </OpenBook>
  )
}
