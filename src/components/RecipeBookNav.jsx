import { useEffect, useRef, useState } from 'react'
import {
  categories,
  getCategory,
  getRecipesForCategory,
} from '../data/recipes'
import OpenBook from './OpenBook'
import BookStickyNote from './BookStickyNote'
import BookToyMenuList from './BookToyMenuList'
import MenuFoodIcon from './MenuFoodIcon'
import {
  playEnterPop,
  playPageTurn,
  playTabClick,
  primeToySounds,
} from '../utils/toySounds'

const PAGE_FLIP_MS = 700
const BACK_BUTTON_IMAGE = '/assets/back button.png'
const MENU_SCROLL_STEP = 52

export default function RecipeBookNav({
  screen,
  categoryId,
  onSelectCategory,
  onSelectRecipe,
  onBack,
  onHome,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [focusTarget, setFocusTarget] = useState('menu')
  const [flipping, setFlipping] = useState(false)
  const [noteBump, setNoteBump] = useState(false)
  const menuViewportRef = useRef(null)
  const menuItemRefs = useRef([])
  const lastSelectedRef = useRef(0)
  const lastFocusTargetRef = useRef('menu')

  const category = categoryId ? getCategory(categoryId) : null
  const recipes = categoryId ? getRecipesForCategory(categoryId) : []

  const menuItems = screen === 'categories' ? categories : recipes

  useEffect(() => {
    primeToySounds()
  }, [])

  useEffect(() => {
    setSelectedIndex(0)
    setFocusTarget('menu')
    lastSelectedRef.current = 0
    lastFocusTargetRef.current = 'menu'
    if (menuViewportRef.current) {
      menuViewportRef.current.scrollTop = 0
    }
  }, [screen, categoryId])

  useEffect(() => {
    if (focusTarget === 'back' && lastFocusTargetRef.current !== 'back') {
      playTabClick()
    }

    lastFocusTargetRef.current = focusTarget
  }, [focusTarget])

  useEffect(() => {
    menuItemRefs.current = menuItemRefs.current.slice(0, menuItems.length)
  }, [menuItems.length])

  useEffect(() => {
    if (focusTarget !== 'menu') return

    const selectedEl = menuItemRefs.current[selectedIndex]
    if (!selectedEl) return

    selectedEl.scrollIntoView({ block: 'nearest', behavior: 'auto' })

    if (selectedIndex !== lastSelectedRef.current) {
      playTabClick()
      lastSelectedRef.current = selectedIndex
      setNoteBump(true)
      const timer = window.setTimeout(() => setNoteBump(false), 320)
      return () => window.clearTimeout(timer)
    }

    return undefined
  }, [focusTarget, selectedIndex, menuItems, screen])

  useEffect(() => {
    if (!flipping) return undefined

    playPageTurn()

    const timer = window.setTimeout(() => {
      setFlipping(false)
    }, PAGE_FLIP_MS)

    return () => window.clearTimeout(timer)
  }, [flipping])

  useEffect(() => {
    function handleKeyDown(event) {
      if (flipping) return

      if (event.key === 'ArrowDown') {
        event.preventDefault()

        if (focusTarget === 'back') {
          setFocusTarget('menu')
          setSelectedIndex(0)
          return
        }

        if (selectedIndex < menuItems.length - 1) {
          setSelectedIndex((index) => index + 1)
        } else {
          scrollMenuBy(MENU_SCROLL_STEP)
        }
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()

        if (focusTarget === 'back') {
          return
        }

        if (selectedIndex > 0) {
          setSelectedIndex((index) => index - 1)
        } else {
          scrollMenuBy(-MENU_SCROLL_STEP)
          if (menuViewportRef.current?.scrollTop === 0) {
            setFocusTarget('back')
          }
        }
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()

        if (focusTarget === 'menu') {
          setFocusTarget('back')
        }
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()

        if (focusTarget === 'back') {
          setFocusTarget('menu')
        }
        return
      }

      if (event.key === 'Enter') {
        event.preventDefault()

        if (focusTarget === 'back') {
          handleBookBack()
          return
        }

        const item = menuItems[selectedIndex]
        if (!item) return

        playEnterPop()

        if (screen === 'categories') {
          setFlipping(true)
          window.setTimeout(() => onSelectCategory(item.id), PAGE_FLIP_MS)
        }

        if (screen === 'recipeList') {
          setFlipping(true)
          window.setTimeout(() => onSelectRecipe(item.id), PAGE_FLIP_MS)
        }

        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        handleBookBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    focusTarget,
    screen,
    selectedIndex,
    menuItems,
    flipping,
    onSelectCategory,
    onSelectRecipe,
    onBack,
    onHome,
  ])

  function scrollMenuBy(delta) {
    const viewport = menuViewportRef.current
    if (!viewport) return

    const maxScroll = viewport.scrollHeight - viewport.clientHeight
    if (maxScroll <= 0) return

    viewport.scrollTop = Math.max(0, Math.min(maxScroll, viewport.scrollTop + delta))
  }

  function handleBookBack() {
    if (flipping) return

    setFlipping(true)

    if (screen === 'categories') {
      window.setTimeout(() => onHome(), PAGE_FLIP_MS)
      return
    }

    window.setTimeout(() => onBack(screen), PAGE_FLIP_MS)
  }

  function handleMenuClick(index) {
    setFocusTarget('menu')

    if (index !== selectedIndex) {
      playTabClick()
    }
    setSelectedIndex(index)
  }

  const menuSelectedIndex = focusTarget === 'menu' ? selectedIndex : -1
  const backLabel =
    screen === 'categories' ? 'Back to home' : 'Back to categories'

  function renderBackButton() {
    return (
      <div className="book-nav-back-wrap">
        <button
          type="button"
          className={`book-nav-back-button${focusTarget === 'back' ? ' book-nav-back-button--selected' : ''}`}
          onClick={handleBookBack}
        >
          <img
            className="book-nav-back-button-image"
            src={BACK_BUTTON_IMAGE}
            alt={backLabel}
            draggable={false}
          />
        </button>
      </div>
    )
  }

  function renderMenuIcon(item) {
    return <MenuFoodIcon id={item.id} className="book-toy-menu-item__icon" />
  }

  function renderCategories() {
    const selectedCategory = categories[selectedIndex]

    return (
      <>
        <BookToyMenuList
          items={categories}
          selectedIndex={menuSelectedIndex}
          onSelect={handleMenuClick}
          renderIcon={(item) => renderMenuIcon(item)}
          itemRefs={menuItemRefs}
          viewportRef={menuViewportRef}
          bump={noteBump}
        />

        <div
          className={`book-text book-text--right book-text--hint book-text--physical book-text--chapter-preview${noteBump ? ' book-text--note-bump' : ''}`}
        >
          {selectedCategory && (
            <BookStickyNote
              title={selectedCategory.title}
              icon={
                <MenuFoodIcon
                  id={selectedCategory.id}
                  className="book-sticky-note__chapter-icon"
                />
              }
              tilt={-2.8}
            />
          )}
        </div>
      </>
    )
  }

  function renderRecipeList() {
    const selectedRecipe = recipes[selectedIndex]

    return (
      <>
        <BookToyMenuList
          items={recipes}
          selectedIndex={menuSelectedIndex}
          onSelect={handleMenuClick}
          renderIcon={(item) => renderMenuIcon(item)}
          itemRefs={menuItemRefs}
          viewportRef={menuViewportRef}
          bump={noteBump}
        />

        <div
          className={`book-text book-text--right book-text--hint book-text--physical${noteBump ? ' book-text--note-bump' : ''}`}
        >
          {selectedRecipe && (
            <BookStickyNote
              title={selectedRecipe.title}
              summary={selectedRecipe.description}
              icon={
                <MenuFoodIcon
                  id={selectedRecipe.id}
                  className="book-sticky-note__chapter-icon"
                />
              }
              tilt={2.2}
            />
          )}
        </div>
      </>
    )
  }

  return (
    <OpenBook settled focused flipping={flipping} toyWallpaper>
      {screen === 'categories' && renderCategories()}
      {screen === 'recipeList' && renderRecipeList()}
      {renderBackButton()}
    </OpenBook>
  )
}
