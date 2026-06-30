import './App.css'
import { useState } from 'react'
import HomeScreen from './components/HomeScreen'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [categoryId, setCategoryId] = useState(null)
  const [recipeId, setRecipeId] = useState(null)

  function goToCategories() {
    setCategoryId(null)
    setRecipeId(null)
    setScreen('categories')
  }

  function selectCategory(nextCategoryId) {
    setCategoryId(nextCategoryId)
    setRecipeId(null)
    setScreen('recipeList')
  }

  function selectRecipe(nextRecipeId) {
    setRecipeId(nextRecipeId)
    setScreen('recipeDetail')
  }

  function goBack(fromScreen) {
    if (fromScreen === 'recipeDetail') {
      setRecipeId(null)
      setScreen('recipeList')
      return
    }

    if (fromScreen === 'recipeList') {
      setCategoryId(null)
      setRecipeId(null)
      setScreen('categories')
    }
  }

  function goHome() {
    setCategoryId(null)
    setRecipeId(null)
    setScreen('home')
  }

  return (
    <HomeScreen
      screen={screen}
      categoryId={categoryId}
      recipeId={recipeId}
      onGoToCategories={goToCategories}
      onSelectCategory={selectCategory}
      onSelectRecipe={selectRecipe}
      onBack={goBack}
      onHome={goHome}
    />
  )
}
