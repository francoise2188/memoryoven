import {
  GiBanana,
  GiBowlOfRice,
  GiBreadSlice,
  GiBroccoli,
  GiChiliPepper,
  GiChocolateBar,
  GiChefToque,
  GiChickenLeg,
  GiCookie,
  GiCookingPot,
  GiCupcake,
  GiFriedEggs,
  GiHearts,
  GiHoneyJar,
  GiHotMeal,
  GiLemon,
  GiMeat,
  GiNoodles,
  GiPieSlice,
} from 'react-icons/gi'

const ICONS = {
  breakfast: GiFriedEggs,
  dinner: GiCookingPot,
  desserts: GiCookie,
  muffins: GiCupcake,
  'family-favorites': GiHearts,
  'ninna-recipes': GiChefToque,
  pancakes: GiHotMeal,
  'french-toast': GiBreadSlice,
  'scrambled-eggs': GiFriedEggs,
  'chicken-soup': GiChickenLeg,
  spaghetti: GiNoodles,
  'rice-and-beans': GiBowlOfRice,
  'chocolate-chip-cookies': GiCookie,
  'apple-pie': GiPieSlice,
  brigadeiro: GiChocolateBar,
  'frankies-lemon-cream-pie': GiLemon,
  'blueberry-muffins': GiCupcake,
  'banana-muffins': GiBanana,
  'veggie-muffins': GiBroccoli,
  'grandmas-sunday-sauce': GiMeat,
  'dads-chili': GiChiliPepper,
  'chicken-and-rice': GiBowlOfRice,
  'lennons-pancakes': GiHoneyJar,
  'ninnas-lasagna': GiNoodles,
  'ninnas-chicken-rice': GiBowlOfRice,
  'ninnas-sugar-cookies': GiCookie,
}

export default function MenuFoodIcon({ id, className = '' }) {
  const Icon = ICONS[id]
  if (!Icon) return null

  return (
    <Icon
      className={`menu-food-icon menu-food-icon--${id} ${className}`.trim()}
      aria-hidden="true"
    />
  )
}
