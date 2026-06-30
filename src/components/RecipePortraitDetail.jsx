import { useEffect, useRef, useState } from 'react'
import {
  playEnterPop,
  playIngredientCheck,
  playTabClick,
  primeToySounds,
} from '../utils/toySounds'

const PORTRAIT_CARD_IMAGE = '/assets/lets cook dirty recipe card.png'
const BACK_BUTTON_IMAGE = '/assets/back button.png'
const SCROLL_STEP = 44

export default function RecipePortraitDetail({ recipe, onBack }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [focusTarget, setFocusTarget] = useState('ingredient')
  const [checkedIndices, setCheckedIndices] = useState(() => new Set())
  const viewportRef = useRef(null)
  const ingredientRefs = useRef([])
  const lastFocusTargetRef = useRef('ingredient')

  useEffect(() => {
    primeToySounds()
  }, [])

  useEffect(() => {
    setSelectedIndex(0)
    setFocusTarget('ingredient')
    lastFocusTargetRef.current = 'ingredient'
    setCheckedIndices(new Set())
    if (viewportRef.current) {
      viewportRef.current.scrollTop = 0
    }
  }, [recipe?.id])

  useEffect(() => {
    if (focusTarget === 'back' && lastFocusTargetRef.current !== 'back') {
      playTabClick()
    }

    lastFocusTargetRef.current = focusTarget
  }, [focusTarget])

  useEffect(() => {
    if (focusTarget !== 'ingredient') return

    const selectedEl = ingredientRefs.current[selectedIndex]
    if (!selectedEl) return

    selectedEl.scrollIntoView({ block: 'nearest', behavior: 'auto' })
  }, [focusTarget, selectedIndex, recipe?.id])

  useEffect(() => {
    ingredientRefs.current = ingredientRefs.current.slice(
      0,
      recipe?.ingredients.length ?? 0,
    )
  }, [recipe?.ingredients.length])

  useEffect(() => {
    function scrollCardBy(delta) {
      const viewport = viewportRef.current
      if (!viewport) return

      const maxScroll = Math.max(
        0,
        viewport.scrollHeight - viewport.clientHeight,
      )
      viewport.scrollTop = Math.max(
        0,
        Math.min(maxScroll, viewport.scrollTop + delta),
      )
    }

    function handleKeyDown(event) {
      if (!recipe) return

      if (event.key === 'ArrowDown') {
        event.preventDefault()

        if (focusTarget === 'back') {
          setFocusTarget('ingredient')
          setSelectedIndex(0)
          return
        }

        const lastIndex = recipe.ingredients.length - 1

        if (selectedIndex < lastIndex) {
          setSelectedIndex((index) => index + 1)
        } else {
          scrollCardBy(SCROLL_STEP)
        }
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()

        if (focusTarget === 'back') {
          return
        }

        const viewport = viewportRef.current

        if (selectedIndex > 0) {
          setSelectedIndex((index) => index - 1)
        } else if (viewport && viewport.scrollTop > 0) {
          scrollCardBy(-SCROLL_STEP)
        } else {
          setFocusTarget('back')
        }
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()

        if (focusTarget === 'ingredient') {
          setFocusTarget('back')
        }
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()

        if (focusTarget === 'back') {
          setFocusTarget('ingredient')
        }
        return
      }

      if (event.key === 'Enter') {
        event.preventDefault()

        if (focusTarget === 'back') {
          playEnterPop()
          onBack()
          return
        }

        toggleIngredientCheck(selectedIndex)
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        onBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusTarget, onBack, recipe, selectedIndex])

  function toggleIngredientCheck(index) {
    setCheckedIndices((current) => {
      const next = new Set(current)
      const willCheck = !next.has(index)
      if (willCheck) {
        next.add(index)
      } else {
        next.delete(index)
      }
      playIngredientCheck(willCheck)
      return next
    })
  }

  function handleIngredientClick(index) {
    setFocusTarget('ingredient')

    if (selectedIndex === index && focusTarget === 'ingredient') {
      toggleIngredientCheck(index)
      return
    }

    setSelectedIndex(index)
  }

  function handleBack() {
    playEnterPop()
    onBack()
  }

  if (!recipe) return null

  return (
    <div className="recipe-portrait-overlay recipe-portrait-overlay--enter">
      <div className="recipe-portrait-stage">
        <article className="recipe-portrait-card">
          <img
            className="recipe-portrait-image"
            src={PORTRAIT_CARD_IMAGE}
            alt=""
            draggable={false}
          />

          <div ref={viewportRef} className="recipe-portrait-viewport">
            <div className="recipe-portrait-content">
              <h1 className="recipe-portrait-title">{recipe.title}</h1>
              <p className="recipe-portrait-description">{recipe.description}</p>

              <section className="recipe-portrait-section recipe-portrait-section--ingredients">
                <h2 className="recipe-portrait-heading">Ingredients</h2>
                <ul className="recipe-portrait-list recipe-portrait-list--checkable">
                  {recipe.ingredients.map((item, index) => {
                    const isSelected =
                      focusTarget === 'ingredient' && index === selectedIndex
                    const isChecked = checkedIndices.has(index)

                    return (
                      <li key={item}>
                        <button
                          type="button"
                          ref={(element) => {
                            ingredientRefs.current[index] = element
                          }}
                          className={`recipe-portrait-ingredient${isSelected ? ' recipe-portrait-ingredient--selected' : ''}${isChecked ? ' recipe-portrait-ingredient--checked' : ''}`}
                          onClick={() => handleIngredientClick(index)}
                          aria-pressed={isChecked}
                        >
                          <span className="recipe-portrait-checkbox" aria-hidden="true">
                            {isChecked && (
                              <span className="recipe-portrait-checkbox-mark">✓</span>
                            )}
                          </span>
                          <span className="recipe-portrait-ingredient-label">
                            {item}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </section>

              <section className="recipe-portrait-section recipe-portrait-section--instructions">
                <h2 className="recipe-portrait-heading">Instructions</h2>
                <ol className="recipe-portrait-steps">
                  {recipe.instructions.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>

              {recipe.personalNote && (
                <section className="recipe-portrait-section recipe-portrait-section--personal">
                  <h2 className="recipe-portrait-heading recipe-portrait-heading--personal">
                    Personal Note
                  </h2>
                  <div className="recipe-portrait-personal-note">
                    <p className="recipe-portrait-personal-note__text">
                      {recipe.personalNote}
                    </p>
                  </div>
                </section>
              )}
            </div>
          </div>

          <div className="recipe-portrait-back-wrap">
            <button
              type="button"
              className={`recipe-portrait-back-button${focusTarget === 'back' ? ' recipe-portrait-back-button--selected' : ''}`}
              onClick={handleBack}
            >
              <img
                className="recipe-portrait-back-button-image"
                src={BACK_BUTTON_IMAGE}
                alt="Back to recipe list"
                draggable={false}
              />
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}
