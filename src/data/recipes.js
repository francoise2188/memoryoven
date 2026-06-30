export const categories = [
  { id: 'breakfast', title: 'Breakfast' },
  { id: 'dinner', title: 'Dinner' },
  { id: 'desserts', title: 'Desserts' },
  { id: 'muffins', title: 'Muffins' },
  { id: 'family-favorites', title: 'Family Favorites' },
  { id: 'ninna-recipes', title: "Ninna's Recipes" },
]

function recipe(id, title, description, ingredients, instructions, personalNote) {
  const item = { id, title, description, ingredients, instructions }
  if (personalNote) item.personalNote = personalNote
  return item
}

export const recipesByCategory = {
  breakfast: [
    recipe(
      'pancakes',
      'Pancakes',
      'Soft morning pancakes with butter and syrup.',
      ['2 cups flour', '2 tbsp sugar', '1 tbsp baking powder', '2 eggs', '1 3/4 cups milk', '3 tbsp melted butter'],
      ['Mix dry ingredients.', 'Whisk in eggs, milk, and butter.', 'Cook on a warm griddle until golden.']
    ),
    recipe(
      'french-toast',
      'French Toast',
      'Thick bread soaked in cinnamon custard and pan-fried.',
      ['6 thick bread slices', '3 eggs', '3/4 cup milk', '1 tsp cinnamon', '1 tsp vanilla', 'Butter for the pan'],
      ['Whisk eggs, milk, cinnamon, and vanilla.', 'Dip each bread slice until soaked.', 'Cook on buttered griddle until browned.']
    ),
    recipe(
      'scrambled-eggs',
      'Scrambled Eggs',
      'Soft, buttery eggs finished with a pinch of salt.',
      ['6 eggs', '3 tbsp butter', '2 tbsp milk', 'Salt and pepper'],
      ['Beat eggs with milk, salt, and pepper.', 'Melt butter in a pan over low heat.', 'Stir eggs gently until softly set.']
    ),
  ],
  dinner: [
    recipe(
      'chicken-soup',
      'Chicken Soup',
      'A cozy family dinner soup.',
      ['Chicken', 'Carrots', 'Celery', 'Onion', 'Garlic', 'Broth'],
      ['Sauté vegetables.', 'Add chicken and broth.', 'Simmer until tender.']
    ),
    recipe(
      'spaghetti',
      'Spaghetti',
      'Simple red sauce spaghetti.',
      ['Spaghetti', 'Tomato sauce', 'Garlic', 'Olive oil', 'Parmesan'],
      ['Boil pasta.', 'Warm sauce with garlic.', 'Toss together and serve.']
    ),
    recipe(
      'rice-and-beans',
      'Rice and Beans',
      'Comforting one-pot rice with seasoned black beans.',
      ['2 cups rice', '2 cups black beans', '1 onion', '2 garlic cloves', '4 cups broth', 'Cumin and bay leaf'],
      ['Sauté onion and garlic until fragrant.', 'Add rice, beans, broth, and spices.', 'Cover and simmer until rice is tender.']
    ),
    recipe(
      'dads-chili',
      'Dad’s Chili',
      'Turkey and three beans — quick to make, even better the longer it simmers.',
      [
        '1 pound lean ground turkey',
        '1 can salted kidney beans',
        '1 can salted black beans',
        '1 can salted pinto beans',
        '1 can sweet corn',
        '1 pouch chili powder',
        'Slap Ya Mama seasoning, to taste',
      ],
      [
        'Brown turkey in a saucepan, adding half the chili powder packet.',
        'Add all ingredients to a large pot.',
        'Simmer on low for 15 minutes — the longer it simmers, the better it gets!',
      ]
    ),
    recipe(
      'chicken-and-rice',
      'Chicken and Rice',
      'Creamy one-pan bake — boneless chicken cooks faster.',
      [
        '1 can cream of mushroom',
        '1 can cream of chicken',
        '1 can cream of celery',
        '1 cup water',
        '1 cup rice',
        '1 pound chicken (boneless cooks faster)',
        'Salt, pepper, and Slap Ya Mama seasoning, to taste',
      ],
      [
        'Preheat oven to 325°F.',
        'Combine all ingredients in a baking pan.',
        'Bake 45 minutes to 1 hour, or until rice and chicken are cooked through.',
      ]
    ),
  ],
  desserts: [
    recipe(
      'chocolate-chip-cookies',
      'Chewy Chocolate Chip Cookies',
      'Chill the dough for extra-chewy cookies with melty milk chocolate.',
      [
        '1/2 cup granulated sugar',
        '3/4 cup packed brown sugar',
        '1 teaspoon salt',
        '1/2 cup salted butter, melted',
        '1 egg',
        '1 teaspoon vanilla extract',
        '1 1/4 cups all-purpose flour',
        '1/2 teaspoon baking soda',
        '4 oz milk chocolate chips',
      ],
      [
        'In a large bowl, whisk together sugars, salt, and butter until a paste with no lumps.',
        'Whisk in egg and vanilla, beating until light ribbons fall off the whisk and stay for a moment before sinking back in.',
        'Sift in flour and baking soda, then fold with a spatula until just combined.',
        'Fold in chocolate chips and chill for at least 30 minutes, or overnight.',
        'Bake at 350°F for 12–15 minutes.',
      ]
    ),
    recipe(
      'apple-pie',
      'Apple Pie',
      'Cinnamon apples tucked into a flaky homemade crust.',
      ['6 apples', '2 pie crusts', '3/4 cup sugar', '2 tsp cinnamon', '2 tbsp butter', '1 egg for wash'],
      ['Slice apples and toss with sugar and cinnamon.', 'Fill the bottom crust with apples.', 'Cover, crimp edges, and brush with egg wash.', 'Bake at 375 F until golden.']
    ),
    recipe(
      'brigadeiro',
      'Brigadeiro',
      'Fudgy Brazilian treats rolled in chocolate sprinkles.',
      ['1 can sweetened condensed milk', '4 tbsp cocoa powder', '2 tbsp butter', 'Chocolate sprinkles'],
      ['Stir milk, cocoa, and butter in a saucepan.', 'Cook over medium heat until thick.', 'Cool slightly, then roll into balls.']
    ),
    recipe(
      'frankies-lemon-cream-pie',
      'Frankie’s Lemon Cream Pie',
      'Tangy lemon filling with fluffy whipped cream on top.',
      [
        'Graham cracker pie crust',
        '2 cans sweetened condensed milk',
        '3 large egg yolks',
        '3/4 cup fresh-squeezed lemon juice (plus 2 tablespoons set aside)',
        '5–6 lemons',
        '1 cup heavy whipping cream',
        '1/2 teaspoon vanilla extract',
      ],
      [
        'Preheat oven to 375°F.',
        'Set aside 3 tablespoons of sweetened condensed milk.',
        'Whisk the rest of the condensed milk and egg yolks until smooth.',
        'Slowly add lemon juice in 3 parts, mixing well after each addition.',
        'Pour mixture into pie crust and bake until edges are set but the center still moves, about 15 minutes.',
        'Let cool for at least 3 hours, but preferably overnight.',
        'Once chilled, whip the cream with the reserved 3 tablespoons of condensed milk and vanilla until stiff peaks form. Spread on top of the pie.',
        'Top whipped cream with shaved lemon zest for extra lemon flavor.',
      ]
    ),
  ],
  muffins: [
    recipe(
      'blueberry-muffins',
      'Blueberry Muffins',
      'Tender muffins bursting with fresh blueberries.',
      ['2 cups flour', '1/2 cup sugar', '2 tsp baking powder', '1 cup milk', '1/3 cup oil', '1 cup blueberries'],
      ['Mix dry ingredients in a large bowl.', 'Stir in milk and oil until just combined.', 'Fold in blueberries gently.', 'Bake at 375 F for 18-20 minutes.']
    ),
    recipe(
      'banana-muffins',
      'Banana Muffins',
      'Sweet, moist muffins — use very ripe bananas for the best flavor.',
      [
        '1 1/2 cups flour',
        '1 teaspoon baking soda',
        '1 teaspoon baking powder',
        '1 teaspoon vanilla extract',
        '1/2 teaspoon salt',
        '3 large bananas, mashed (the browner the sweeter)',
        '3/4 cup sugar',
        '1 egg',
        '1/3 cup butter, melted',
      ],
      [
        'Mix wet ingredients together.',
        'Sift flour and dry ingredients.',
        'Slowly mix in dry ingredients in 3 parts and fold.',
        'Spray muffin tin with butter.',
        'Bake at 350°F for 15 minutes.',
      ]
    ),
    recipe(
      'veggie-muffins',
      'Veggie Muffins',
      'Hidden veggies and fruit in every bite — great for picky eaters.',
      [
        '1 cup whole wheat flour',
        '1 cup all-purpose flour',
        '1 teaspoon baking soda',
        '1/2 teaspoon salt',
        '1/4 teaspoon nutmeg',
        '1/2 teaspoon cinnamon',
        '1/2 cup sugar',
        '4 tablespoons butter',
        '2 eggs',
        '1 teaspoon vanilla extract',
        '1/2 cup steamed broccoli',
        '1 small zucchini, shredded',
        '1 carrot, shredded',
        '1/2 apple',
        '1 banana',
        '1/4 cup applesauce',
        '1/4 cup vanilla yogurt',
      ],
      [
        'Mix dry ingredients together.',
        'In a separate bowl, mix sugar, soft butter, vanilla, and yogurt.',
        'Steam the broccoli. Shred the zucchini and squeeze the water out.',
        'Add all the veggies and fruit to a food processor.',
        'Combine the purée into the wet ingredients.',
        'Slowly add dry ingredients in 3 parts.',
        'Spray a muffin tin with butter and fill each cup 3/4 full.',
        'Bake at 375°F for 18–22 minutes.',
      ],
      "Lennon's favorite muffins!"
    ),
  ],
  'family-favorites': [
    recipe(
      'grandmas-sunday-sauce',
      'Grandma’s Sunday Sauce',
      'All-day tomato sauce with meatballs and fresh basil.',
      ['2 cans crushed tomatoes', '1 lb ground beef', '1 onion', '4 garlic cloves', 'Fresh basil', 'Olive oil'],
      ['Brown meatballs and set aside.', 'Simmer tomatoes with onion and garlic.', 'Return meatballs to the pot and cook low and slow.']
    ),
    recipe(
      'lennons-pancakes',
      'Lennon’s Pancakes',
      'Extra-fluffy pancakes with vanilla and a touch of honey.',
      ['1 1/2 cups flour', '1 tbsp honey', '2 tsp baking powder', '1 egg', '1 1/4 cups milk', '1 tsp vanilla'],
      ['Whisk dry ingredients together.', 'Stir in egg, milk, honey, and vanilla.', 'Cook on a buttered griddle.']
    ),
  ],
  'ninna-recipes': [
    recipe(
      'ninnas-lasagna',
      "Ninna's Lasagna",
      'Layers of pasta, rich meat sauce, and plenty of cheese — a Sunday classic.',
      ['Lasagna noodles', 'Ground beef', 'Ricotta', 'Mozzarella', 'Marinara sauce', 'Fresh basil'],
      ['Brown the beef and simmer with marinara.', 'Layer noodles, sauce, ricotta, and cheese.', 'Bake until bubbly and golden on top.']
    ),
    recipe(
      'ninnas-chicken-rice',
      "Ninna's Chicken & Rice",
      'One-pot comfort food with tender chicken and seasoned rice.',
      ['Chicken thighs', '2 cups rice', 'Chicken broth', 'Onion', 'Garlic', 'Paprika'],
      ['Sear chicken until golden.', 'Add rice, broth, and aromatics.', 'Cover and simmer until rice is fluffy.']
    ),
    recipe(
      'ninnas-sugar-cookies',
      "Ninna's Sugar Cookies",
      'Soft, sweet cookies perfect for decorating together.',
      ['2 cups flour', '1 cup sugar', '1/2 cup butter', '1 egg', '1 tsp vanilla', 'Sprinkles'],
      ['Cream butter and sugar.', 'Mix in egg, vanilla, and flour.', 'Bake, cool, and decorate with sprinkles.']
    ),
  ],
}

export function getCategory(categoryId) {
  return categories.find((category) => category.id === categoryId) ?? null
}

export function getRecipesForCategory(categoryId) {
  return recipesByCategory[categoryId] ?? []
}

export function getRecipe(categoryId, recipeId) {
  return getRecipesForCategory(categoryId).find((item) => item.id === recipeId) ?? null
}
