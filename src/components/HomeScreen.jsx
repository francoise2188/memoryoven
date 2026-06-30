import { useEffect, useRef, useState } from 'react'
import OpeningScreen from './OpeningScreen'
import RecipeBookNav from './RecipeBookNav'
import RecipePortraitDetail from './RecipePortraitDetail'
import { getRecipe } from '../data/recipes'

const BOOK_NAV_SCREENS = new Set(['categories', 'recipeList'])
const BOOK_TOY_IMAGE = '/assets/open book toy.png'
const HOME_EXIT_MS = 820

export default function HomeScreen({
  screen,
  categoryId,
  recipeId,
  onGoToCategories,
  onSelectCategory,
  onSelectRecipe,
  onBack,
  onHome,
}) {
  const [homeExiting, setHomeExiting] = useState(false)
  const [bookEntering, setBookEntering] = useState(false)
  const wasBookFocusedRef = useRef(false)

  const isHome = screen === 'home'
  const bookNavActive = BOOK_NAV_SCREENS.has(screen)
  const recipeDetailActive = screen === 'recipeDetail'
  const bookSceneActive = bookNavActive || recipeDetailActive
  const recipe = recipeDetailActive ? getRecipe(categoryId, recipeId) : null

  function handleLetsCook() {
    if (homeExiting) return
    setHomeExiting(true)

    window.setTimeout(() => {
      onGoToCategories()
      setHomeExiting(false)
    }, HOME_EXIT_MS)
  }

  function handlePortraitBack() {
    onBack('recipeDetail')
  }

  useEffect(() => {
    if (!bookNavActive) {
      wasBookFocusedRef.current = false
      setBookEntering(false)
      return undefined
    }

    if (wasBookFocusedRef.current) return undefined

    wasBookFocusedRef.current = true
    setBookEntering(true)
    const timer = window.setTimeout(() => setBookEntering(false), 1100)
    return () => window.clearTimeout(timer)
  }, [bookNavActive])

  const screenClass = [
    bookSceneActive ? 'home-screen--book-toy' : '',
    recipeDetailActive ? 'home-screen--recipe-detail' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="home-screen-wrapper">
      <main className={`home-screen${screenClass ? ` ${screenClass}` : ''}`}>
        {isHome ? (
          <OpeningScreen onStart={handleLetsCook} exiting={homeExiting} />
        ) : (
          <>
            <div
              className={`book-toy-scene${bookEntering ? ' book-toy-scene--enter' : ''}`}
            >
              <img
                className="book-toy-wallpaper"
                src={BOOK_TOY_IMAGE}
                alt=""
                draggable={false}
              />
            </div>

            {recipeDetailActive && (
              <div className="scene-focus-dim scene-focus-dim--recipe" aria-hidden="true" />
            )}

            {bookNavActive && (
              <div
                className={`book-focus-stage book-focus-stage--toy${bookEntering ? ' book-focus-stage--enter' : ''}`}
              >
                <RecipeBookNav
                  screen={screen}
                  categoryId={categoryId}
                  onSelectCategory={onSelectCategory}
                  onSelectRecipe={onSelectRecipe}
                  onBack={onBack}
                  onHome={onHome}
                />
              </div>
            )}

            {recipeDetailActive && (
              <RecipePortraitDetail recipe={recipe} onBack={handlePortraitBack} />
            )}
          </>
        )}
      </main>
    </div>
  )
}
